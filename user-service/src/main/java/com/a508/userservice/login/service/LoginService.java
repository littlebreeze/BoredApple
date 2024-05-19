package com.a508.userservice.login.service;


import com.a508.userservice.common.exception.CustomException;
import com.a508.userservice.common.exception.ErrorCode;
import com.a508.userservice.common.jwt.TokenProvider;
import com.a508.userservice.login.data.GoogleOAuthTokenRes;
import com.a508.userservice.login.data.GoogleUserInfoRes;
import com.a508.userservice.login.data.OauthTokenRes;
import com.a508.userservice.login.data.RefreshToken;
import com.a508.userservice.login.repository.RefreshTokenRepository;
import com.a508.userservice.user.data.UserRole;
import com.a508.userservice.user.domain.User;
import com.a508.userservice.user.repository.UserRepository;
import com.google.gson.Gson;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    private final String GRANT_TYPE = "authorization_code";

    @Value("${spring.security.oauth2.provider.google.client-id}")
    private String CLIENT_ID;

    private final String TOKEN_URL = "https://oauth2.googleapis.com/token";

    @Value("${spring.security.oauth2.provider.google.client-secret}")
    private String CLIENT_SECRET;

    public GoogleOAuthTokenRes getTokenbyCode(String code) {

        // POST 방식으로 key=value 데이터를 요청 (구글 쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_SECRET);
        params.add("code", code);
        params.add("redirect_uri", "https://k10a508.p.ssafy.io" + "/login/authentication");

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // googleTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> googleTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                TOKEN_URL,
                HttpMethod.POST,
                googleTokenRequest,
                String.class
        );

        Gson gson = new Gson();
        return gson.fromJson(response.getBody(), GoogleOAuthTokenRes.class);

    }

    public GoogleUserInfoRes getUserInfoByToken(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange(
                "https://www.googleapis.com/userinfo/v2/me?access_token=" + accessToken,
                HttpMethod.GET,
                req,
                String.class
        );

        Gson gson = new Gson();
        return gson.fromJson(response.getBody(), GoogleUserInfoRes.class);
    }

    public OauthTokenRes getAccessTokenJsonData(HttpServletResponse response,String code) {
        //코드로 토큰받기
        GoogleOAuthTokenRes oauthTokenData = getTokenbyCode(code);

        //토큰으로 사용자 정보 받기
        GoogleUserInfoRes googleUserInfoRes = getUserInfoByToken(oauthTokenData.getAccess_token());

        //받아온 사용자 정보(로그인/회원가입한 유저)로 우리 토큰 만들기
        return generateTokenbyUserInfo(response,googleUserInfoRes);
    }

    private OauthTokenRes generateTokenbyUserInfo(HttpServletResponse response,GoogleUserInfoRes googleUserInfoRes) {
        boolean signUp = false;
        if (userRepository.findByGoogleId(googleUserInfoRes.getId()) == null) { //우리 회원이 아니면
            User newMember = User.builder()
                    .googleId(googleUserInfoRes.getId())
                    .email(googleUserInfoRes.getEmail())
                    .nickname(null)
                    .role(UserRole.ROLE_USER)
                    .signUpProcess(1)
                    .build();
            userRepository.save(newMember);
            signUp = true;


        }

        User user = userRepository.findByGoogleId(googleUserInfoRes.getId());
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND_ERROR);
        }
        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);

       
       Cookie cookie=createCookie(oauthTokenRes.getRefreshToken());

        // 쿠키 전송
       response.addCookie(cookie); //만들어진 쿠키를 쿠키에 저장해준다.

        //refreshToken redis에 저장
        refreshTokenService.saveTokenInfo(
                user.getId(), oauthTokenRes.getRefreshToken(),
                LocalDateTime.now().plusSeconds(oauthTokenRes.getRefreshTokenExpiresIn()),
                false
        );

        if (signUp) oauthTokenRes.isSignUp(true);

        return oauthTokenRes;
    }

    public OauthTokenRes regenerateToken(HttpServletResponse response, HttpServletRequest request) {

        Cookie rc[] = request.getCookies();
        System.out.println("rc사이즈"+rc.length);
        String refreshTokenCookie = "";
        for (Cookie cookie : rc) {
            System.out.println("rc" + cookie.getValue());
            if (cookie.getName().equals("refreshtoken")) { // 쿠키의 이름이 "refreshToken"인 경우만 처리
                refreshTokenCookie = cookie.getValue();
                break; // 원하는 쿠키를 찾았으므로 반복문을 종료합니다.
            }
        }
        //Refresh Token 일치 확인
        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(refreshTokenCookie).orElseThrow(() ->
                new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR));

        //Refresh Token 만료 여부
        if (!refreshToken.isValid(LocalDateTime.now())) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_VALIDATION_ERROR);
        }

        //tokenProvider에서 refreshToken으로 member정보 받기
        String googleId = tokenProvider.getUserByRefreshToken(refreshTokenCookie);

        User user = userRepository.findByGoogleId(googleId);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND_ERROR);
        }

        //Member 정보로 토큰 재발급
        OauthTokenRes oauthTokenRes = tokenProvider.generateTokenDto(user);
       
       Cookie cookie=createCookie(oauthTokenRes.getRefreshToken());

        // 쿠키 전송
       response.addCookie(cookie); //만들어진 쿠키를 쿠키에 저장해준다.

        //redis에 저장
        refreshTokenService.saveTokenInfo(
                user.getId(), oauthTokenRes.getRefreshToken(),
                LocalDateTime.now().plusSeconds(oauthTokenRes.getRefreshTokenExpiresIn()),
                false
        );


        return oauthTokenRes;
    }
    public Cookie createCookie(String refreshToken) {
        String cookieName = "refreshtoken";
        String cookieValue = refreshToken; // 쿠키벨류엔 글자제한이 있어, 벨류로 만들어담아준다.
        Cookie cookie = new Cookie(cookieName, cookieValue);
        // 쿠키 속성 설정
        cookie.setHttpOnly(true);  //httponly 옵션 설정
        cookie.setSecure(true); //https 옵션 설정
        cookie.setPath("/"); // 모든 곳에서 쿠키열람이 가능하도록 설정
        cookie.setMaxAge(60 * 60 * 24); //쿠키 만료시간 설정
        return cookie;
    }
}

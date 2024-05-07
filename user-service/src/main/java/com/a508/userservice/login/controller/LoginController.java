package com.a508.userservice.login.controller;

import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.login.data.OauthTokenRes;
import com.a508.userservice.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/oauth2/code/google")
    public SuccessResponse<OauthTokenRes> getAccessTokenJsonData(@RequestBody String code) { // Data를 리턴해주는 컨트롤러 함수
        OauthTokenRes oauthTokenRes = loginService.getAccessTokenJsonData(code);
        return new SuccessResponse<>(oauthTokenRes);
    }

    @PostMapping("/oauth/token") //accessToken 만료 시 refreshToken으로 토큰 재발급
    public SuccessResponse<OauthTokenRes> regenerateToken(@RequestBody String refreshToken) {
        OauthTokenRes oauthTokenRes = loginService.regenerateToken(refreshToken);
        return new SuccessResponse<>(oauthTokenRes);
    }
}

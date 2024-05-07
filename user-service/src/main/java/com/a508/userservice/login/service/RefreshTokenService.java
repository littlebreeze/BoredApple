package com.a508.userservice.login.service;


import com.a508.userservice.login.data.RefreshToken;
import com.a508.userservice.login.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveTokenInfo(Integer memberId, String refreshToken, LocalDateTime expireDate, Boolean isExpired) {
        refreshTokenRepository.save(new RefreshToken(String.valueOf(memberId), refreshToken, expireDate, isExpired));
    }
    //로그아웃 처리 추가
}

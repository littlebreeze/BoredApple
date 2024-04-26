package com.a508.userservice.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //User
    USER_NOT_FOUND_ERROR(404, "MEM001", "존재하지 않는 사용자입니다."),

    //Token
    ACCESS_TOKEN_EXPIRE_ERROR(401, "TOK001", "ACCESS TOKEN이 만료되었습니다."),
    ACCESS_TOKEN_ERROR(401, "TOK002", "Access Token이 잘못되었습니다."),
    REFRESH_TOKEN_VALIDATION_ERROR(401, "TOK003", "Refresh Token이 잘못되었습니다.");


    private final int status;

    private final String code;

    private final String message;
}

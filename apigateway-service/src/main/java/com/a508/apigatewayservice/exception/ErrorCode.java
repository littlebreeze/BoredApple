package com.a508.apigatewayservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //Token
    ACCESS_TOKEN_EXPIRE_ERROR(401, "TOK001", "ACCESS TOKEN이 만료되었습니다."),
    ACCESS_TOKEN_ERROR(401, "TOK002", "ACCESS TOKEN이 잘못되었습니다."),
    NO_ACCESS_TOKEN_ERROR(401, "TOK003", "Header에 Access Token이 없습니다.");

    private final int status;
    private final String code;
    private final String message;



}
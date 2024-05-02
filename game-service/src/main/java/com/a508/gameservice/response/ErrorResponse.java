package com.a508.gameservice.response;

import lombok.Getter;

@Getter
public class ErrorResponse {

    private final String status = "error";

    private final String message;

    public ErrorResponse(String message) {
        this.message = message;
    }
}

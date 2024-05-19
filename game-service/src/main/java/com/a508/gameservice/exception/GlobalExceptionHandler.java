package com.a508.gameservice.exception;

import com.a508.gameservice.response.FailResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // CustomException이 발생했을 때 처리하는 메서드
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handle(CustomException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        return new ResponseEntity<>(
                FailResponse.of(errorCode.getCode(), errorCode.getMessage()),
                HttpStatusCode.valueOf(errorCode.getStatus()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<FailResponse<Map<String, String>>> handleException(Exception e) {
        return new ResponseEntity<>(
                FailResponse.of("SEV001", "서버 동작 중 에러가 발생했습니다."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


}

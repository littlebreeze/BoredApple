package com.a508.apigatewayservice.filter;


import com.a508.apigatewayservice.JwtSecretKeyProvider;
import com.a508.apigatewayservice.exception.CustomException;
import com.a508.apigatewayservice.exception.ErrorCode;
import com.a508.apigatewayservice.exception.ErrorResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    private final JwtSecretKeyProvider jwtSecretKeyProvider;
    private final ObjectMapper objectMapper;

    public AuthorizationHeaderFilter(JwtSecretKeyProvider jwtSecretKeyProvider, ObjectMapper objectMapper) {
        super(Config.class);
        this.jwtSecretKeyProvider = jwtSecretKeyProvider;
        this.objectMapper = objectMapper;
    }


    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            if (request.getHeaders().containsKey("Authorization")) {
                String accessToken = Objects.requireNonNull(request.getHeaders().getFirst("Authorization")).substring(7);

                try {
                    boolean isValidToken = jwtSecretKeyProvider.validateToken(accessToken);
                    if (!isValidToken) {
                        response.setStatusCode(HttpStatus.UNAUTHORIZED);
                        ErrorResponse errorResponse = new ErrorResponse(
                                HttpStatus.UNAUTHORIZED.value(),
                                "TOK001",
                                "유효하지 않은 토큰입니다."
                        );
                        return response.writeWith(Mono.just(errorResponse).flatMap(this::jsonResponse));
                    } else {
                        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                            log.info(String.valueOf(request.getHeaders()));
                        }));
                    }
                } catch (CustomException e) {
                    response.setStatusCode(HttpStatus.UNAUTHORIZED);
                    CustomException customException = (CustomException) e;
                    ErrorCode errorCode = customException.getErrorCode();
                    ErrorResponse errorResponse = new ErrorResponse(
                            errorCode.getStatus(),
                            errorCode.getCode(),
                            errorCode.getMessage()
                    );
                    return response.writeWith(Mono.just(errorResponse).flatMap(this::jsonResponse));
                }
            } else {
                response.setStatusCode(HttpStatus.BAD_REQUEST);
                ErrorResponse errorResponse = new ErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "TOK002",
                        "토큰이 존재하지 않습니다."
                );
                return response.writeWith(Mono.just(errorResponse).flatMap(this::jsonResponse));
            }
        });
    }

    private Mono<DataBuffer> jsonResponse(ErrorResponse errorResponse) {
        try {
            byte[] jsonBytes = objectMapper.writeValueAsBytes(errorResponse);
            DataBuffer buffer = new DefaultDataBufferFactory().wrap(jsonBytes);
            return Mono.just(buffer);
        } catch (JsonProcessingException e) {
            return Mono.error(e);
        }
    }

    public static class Config {
    }


}


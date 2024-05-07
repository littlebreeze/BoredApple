package com.a508.apigatewayservice.filter;

import com.a508.apigatewayservice.exception.CustomException;
import com.a508.apigatewayservice.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
@Slf4j
public class AuthorizationHeaderFilter
        extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    public static class Config {
    }

    private final Key key;

    public AuthorizationHeaderFilter(@Value("${spring.security.oauth2.jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    private static final String BEARER_PREFIX = "Bearer";

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new CustomException(ErrorCode.NO_ACCESS_TOKEN_ERROR);
            }
            String bearerToken = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String token = bearerToken.replace(BEARER_PREFIX, "");
            validateToken(token);
            return chain.filter(exchange);
        };
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new CustomException(ErrorCode.ACCESS_TOKEN_EXPIRE_ERROR);
        } catch (SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            //권한 X |JWT가 올바르게 구성되지 않았을 때 | 수신한 JWT의 형식이 애플리케이션에서 원하는 형식과 맞지 않는 경우
            throw new CustomException(ErrorCode.ACCESS_TOKEN_ERROR);
        }
    }

}


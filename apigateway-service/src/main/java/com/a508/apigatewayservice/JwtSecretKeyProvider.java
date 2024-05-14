package com.a508.apigatewayservice;

import com.a508.apigatewayservice.exception.CustomException;
import com.a508.apigatewayservice.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtSecretKeyProvider {

    private final Key key;

    public JwtSecretKeyProvider(@Value("${spring.security.oauth2.jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
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


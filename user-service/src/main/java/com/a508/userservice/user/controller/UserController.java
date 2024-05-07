package com.a508.userservice.user.controller;

import com.a508.userservice.common.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final TokenProvider tokenProvider;

    @GetMapping("/userId")
    public Integer getUserIdByToken(@RequestParam String token) {
        return tokenProvider.getUserIdByToken(token);
    }


}

package com.a508.userservice.user.controller;

import com.a508.userservice.common.jwt.TokenProvider;
import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final TokenProvider tokenProvider;
    private final UserService userService;

    @GetMapping("/userId")
    public Integer getUserIdByToken(@RequestParam String token) {
        return tokenProvider.getUserByToken(token).getId();
    }

    @PostMapping("/setnickname")
    public SuccessResponse<Integer> settingNickname(HttpServletRequest request, @RequestBody String nickname) {
        int userId = tokenProvider.getUserIdByToken(request);
        userService.updateNickname(userId, nickname);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }

    @PostMapping("/setcategory")
    public SuccessResponse<Integer> settingCategory(HttpServletRequest request, @RequestBody int[] category) {
        int userId = tokenProvider.getUserIdByToken(request);
        userService.updateCategory(userId, category);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }

    @PostMapping("/setstudytime")
    public SuccessResponse<Integer> settingStudyTime(HttpServletRequest request, @RequestBody int ho, @RequestBody int mi) {
        int userId = tokenProvider.getUserIdByToken(request);
        userService.updateStudyTime(userId, ho, mi);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }
}

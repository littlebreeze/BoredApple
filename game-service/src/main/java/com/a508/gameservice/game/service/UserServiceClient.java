package com.a508.gameservice.game.service;

import com.a508.gameservice.game.data.UserListReq;
import com.a508.gameservice.game.data.UserListRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-service")
public interface UserServiceClient {


    @GetMapping("/userId")
    public Integer getUserIdByToken(@RequestHeader("Authorization") String token);

    @PostMapping("/nicknames")
    public UserListRes getNicknameByUserId(@RequestBody UserListReq userListReq);

    @GetMapping("/nicknames")
    public String getNicknameByUserId(@RequestParam("userId") Integer userId);
}
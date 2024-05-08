package com.a508.gameservice.game.service;

import com.a508.gameservice.game.data.UserListReq;
import com.a508.gameservice.game.data.UserListRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service")
public interface UserServiceClient {


    @GetMapping("/userId")
    public Integer getUserIdByToken(@RequestParam("token") String token);

    @PostMapping("/nicknames")
    public UserListRes getNicknameByUserId(@RequestBody UserListReq userListReq);
}
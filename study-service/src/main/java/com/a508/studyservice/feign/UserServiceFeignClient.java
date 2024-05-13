package com.a508.studyservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.a508.studyservice.dto.response.FeignList;

import feign.Headers;

@FeignClient(name = "user-server", url = "https://k10a508.p.ssafy.io:8081/user-service")
public interface UserServiceFeignClient {

    @GetMapping("/userId")
    int getUserId(@RequestHeader("Authorization")  String token ) ;

    @GetMapping("/allusercategories")
    @Headers("Content-Type: application/json")
    FeignList getAllUser();



}

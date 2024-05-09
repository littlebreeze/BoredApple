package com.a508.studyservice.feign;


import com.a508.studyservice.dto.response.FeignUserScoreResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-server", url = "https://k10a508.p.ssafy.io:8083/user-service")
public interface UserServiceFeignClient {

    @GetMapping("/userId")
    int getUserId(@RequestHeader("Authorization" ) String token ) ;

    @GetMapping("/score")
    FeignUserScoreResponse getUserScore(@RequestHeader("Authorization") String token);



}

package com.a508.studyservice.feign;


import com.a508.studyservice.dto.response.FeignList;
import com.a508.studyservice.dto.response.UserFeignResponse;
import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-server", url = "https://k10a508.p.ssafy.io:8081/user-service")
public interface UserServiceFeignClient {

    @GetMapping("/userId")
    int getUserId(@RequestParam("token")  String token ) ;

    @GetMapping("/allusercategories")
    @Headers("Content-Type: application/json")
    FeignList getAllUser();



}

package com.a508.studyservice.feign;

import com.a508.studyservice.dto.response.StudyTimeFeignResponse;
import com.a508.studyservice.global.common.response.SuccessResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.a508.studyservice.dto.response.FeignList;

import feign.Headers;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserServiceFeignClient {

    @GetMapping("/userId")
    int getUserId(@RequestHeader("Authorization")  String token ) ;

    @GetMapping("/allusercategories")
    @Headers("Content-Type: application/json")
    FeignList getAllUser();


    @GetMapping("/studytime")
    SuccessResponse<List<StudyTimeFeignResponse>> getStudyTime();




}

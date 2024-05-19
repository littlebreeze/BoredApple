package com.a508.studyservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.a508.studyservice.dto.response.SimilarityResponse;

import feign.Headers;

@FeignClient(name = "similar-service" , url = "http://k10a508.p.ssafy.io:8082")
public interface SimilarityServiceFeignClient {

    //주제 찾기 유사도 받아오기
    @PostMapping("/sim")
    @Headers("Content-Type: application/json")
    SimilarityResponse essaySimilarity(@RequestBody String[] essayDto );
}

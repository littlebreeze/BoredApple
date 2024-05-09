package com.a508.studyservice.feign;

import com.a508.studyservice.dto.request.FeignEssaySimilarityRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "similar-service" , url = "http://k10a508.p.ssafy.io/similarity-service")
public interface SimilarityServiceFeignClient {

    //주제 찾기 유사도 받아오기
    @PostMapping()
    double essaySimilarity(@RequestBody FeignEssaySimilarityRequest essayDto );
}

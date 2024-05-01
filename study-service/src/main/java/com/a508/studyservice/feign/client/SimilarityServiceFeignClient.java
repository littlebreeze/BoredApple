package com.a508.studyservice.feign.client;

import com.a508.studyservice.feign.dto.EssayDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "similar-service" , url = "http://k10a508.p.ssafy.io/similarity-service")
public interface SimilarityServiceFeignClient {

    //주제 찾기 유사도 받아오기
    @PostMapping()
    double essaySimilarity(@RequestBody EssayDto essayDto );
}

package com.a508.studyservice.controller;

import com.a508.studyservice.dto.response.StudyTimeFeignResponse;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.kafka.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    private final UserServiceFeignClient userServiceFeignClient;


    @GetMapping("/notifications")
    public SseEmitter subscribe(@RequestHeader(value = "Authorization") String token) {
        String actualToken = token.substring(7);
        String userId = String.valueOf(userServiceFeignClient.getUserId(actualToken));
        log.info("userId : " + userId + "접속을 시도합니다.");
        return notificationService.subscribe(userId);
    }


    public void test() {
        SuccessResponse<List<StudyTimeFeignResponse>>  response = userServiceFeignClient.getStudyTime();
        notificationService.init(response.getData());
    }
    @GetMapping("/init")
    public void test1() {
        notificationService.init2();
    }
}
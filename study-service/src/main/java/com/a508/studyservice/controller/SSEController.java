package com.a508.studyservice.controller;

import com.a508.studyservice.kafka.StudyAlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SSEController {


    private final StudyAlarmService studyAlarmService;

    @GetMapping("/listenForStudyAlarms")
    public SseEmitter listenForStudyAlarms() {
        return studyAlarmService.getStudyAlarmEmitter();
    }
}

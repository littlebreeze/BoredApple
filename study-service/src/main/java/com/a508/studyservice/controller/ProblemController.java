package com.a508.studyservice.controller;

import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/study-service/problem")
@RequiredArgsConstructor
public class ProblemController {

    private final EssayService essayService;
    private final IntensiveService intensiveService;
    private final ParagraphOrderService paragraphOrderService;
    private final SentenceInsertService sentenceInsertService;
    private final TodayLearningService todayLearningService;
    private final TopicProblemService topicProblemService;


    //오늘의 학습
    @GetMapping("/today")
    public ResponseEntity<SuccessResponse<?>> getTodayController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }

    // 정독 훈련
    @GetMapping("/intensive")
    public ResponseEntity<SuccessResponse<?>> getIntensiveController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }


    // 문장 삽입
    @GetMapping("/sentence")
    public ResponseEntity<SuccessResponse<?>> getSentenceController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }

    //주제
    @GetMapping("/topic ")
    public ResponseEntity<SuccessResponse<?>> getTopicController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }


    // 단어 맞추기
    @GetMapping("/voca")
    public ResponseEntity<SuccessResponse<?>> getVocaController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }

    // 객관식 정답
    @PostMapping("/choice")
    public ResponseEntity<SuccessResponse<?>> postChoiceProblem(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }


    // 주관식 정답
    @PostMapping("/topic")
    public ResponseEntity<SuccessResponse<?>> postTopicProblem(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }


}

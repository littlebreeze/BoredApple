package com.a508.studyservice.controller;

import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
@Slf4j
public class ProblemController {

    private final EssayService essayService;
    private final IntensiveService intensiveService;
    private final ParagraphOrderService paragraphOrderService;
    private final SentenceInsertService sentenceInsertService;
    private final TodayLearningService todayLearningService;
    private final VocaService vocaService;

    private final TodayLearningScheduler todayLearningScheduler;




    //오늘의 학습
    @GetMapping("/today")
    public ResponseEntity<SuccessResponse<?>> getTodayController(@RequestHeader(value = "Authorization", required = false) String token){

        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,todayLearningService.getTodayLearning(token)));
    }

    // 정독 훈련
    @GetMapping("/intensive")
    public ResponseEntity<SuccessResponse<?>> getIntensiveController(@RequestHeader(value = "Authorization", required = false) String token,
                                                                     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Received date: {}", date);
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,intensiveService.getIntensiveProblems(token,date.atTime(0,0))));
    }


    // 문장 삽입
    @GetMapping("/sentence")
    public ResponseEntity<SuccessResponse<?>> getSentenceController(@RequestHeader(value = "Authorization", required = false) String token,
                                                                    @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Received date: {}", date);
        if (date == null) {
            date = LocalDate.now();
        }

        return ResponseEntity.ok(new SuccessResponse<>("success", sentenceInsertService.getSentenceProblems(token, date.atTime(0,0))));
    }


    //주제
    @GetMapping("/topic")
    public ResponseEntity<SuccessResponse<?>> getTopicController(@RequestHeader(value = "Authorization", required = false) String token,
                                                                 @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Received date: {}", date);
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(
                new SuccessResponse<>("success" , essayService.getProblemList(token,date.atTime(0,0))));
    }


    // 단어 맞추기
    @GetMapping("/voca")
    public ResponseEntity<SuccessResponse<?>> getVocaController(@RequestHeader(value = "Authorization", required = false) String token,
                                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Received date: {}", date);
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,vocaService.getVocaProblem(token,date.atTime(0,0))));
    }

    //순서
    @GetMapping("/order")
    public ResponseEntity<SuccessResponse<?>> getOrderController(@RequestHeader(value = "Authorization", required = false) String token,
                                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.info("Received date: {}", date);
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,paragraphOrderService.getParagraphProblems(token,date.atTime(0,0))));
    }


}

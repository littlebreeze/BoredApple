package com.a508.studyservice.controller;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.service.EssayService;
import com.a508.studyservice.service.IntensiveService;
import com.a508.studyservice.service.ParagraphOrderService;
import com.a508.studyservice.service.SentenceInsertService;
import com.a508.studyservice.service.TodayLearningScheduler;
import com.a508.studyservice.service.TodayLearningService;
import com.a508.studyservice.service.TopicProblemService;
import com.a508.studyservice.service.VocaService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    @GetMapping("/test")
    public ResponseEntity<SuccessResponse<?>> test(@RequestHeader(value = "Authorization", required = false) String token){
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,"연결 성공"));
    }

    @GetMapping("/tt")
    public void test(){
		try {
			todayLearningScheduler.makeTodayLearning();
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

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

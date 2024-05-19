package com.a508.studyservice.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a508.studyservice.dto.request.ChoiceRequest;
import com.a508.studyservice.dto.request.EssayRequest;
import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.service.ChoiceSolvedService;
import com.a508.studyservice.service.EssayService;
import com.a508.studyservice.service.FiveAbilityService;
import com.a508.studyservice.service.TodayLearningService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/solve")
@RequiredArgsConstructor
@Slf4j
public class SolvedController {

    private final EssayService essayService;
    private final ChoiceSolvedService choiceSolved;
    private final FiveAbilityService fiveAbilityService;
    private  final TodayLearningService todayLearningService;


    //5가지 능력
    @GetMapping("/five")
    public ResponseEntity<SuccessResponse<?>> getFiveAbilityController(@RequestHeader(value = "Authorization") String token){
        log.info(" 5가지 능력 " + token);
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,fiveAbilityService.getFiveAbility(token)));
    }

    @GetMapping("/five/average")
    public ResponseEntity<SuccessResponse<?>> getAverageFiveAbilityController(){
        return ResponseEntity.ok(
            new SuccessResponse<>("success" ,fiveAbilityService.getAverageFiveAbility()));
    }

    @GetMapping("/day")
    public ResponseEntity<SuccessResponse<?>> getSpecificStudyController( @RequestHeader(value = "Authorization") String token,
                                                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,todayLearningService.getDays(date.atTime(0,0),token)));
    }


    @GetMapping("/month")
    public ResponseEntity<SuccessResponse<?>>  getMonthStudyController (@RequestHeader(value = "Authorization", required = false) String token,
                                                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,todayLearningService.getMonths(date.atTime(0,0),token)));
    }

    @GetMapping("/total")
    public ResponseEntity<SuccessResponse<?>>  getTotalStudyController (@RequestHeader(value = "Authorization", required = false) String token,
                                                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return ResponseEntity.ok(
            new SuccessResponse<>("success" ,todayLearningService.getTotal(date.atTime(0,0),token)));
    }

    @PostMapping("/choice")
    public ResponseEntity<SuccessResponse<?>>  saveUserChoice (@RequestHeader(value = "Authorization", required = false) String token, @RequestBody ChoiceRequest request){
        log.info(request.toString());
        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,choiceSolved.postChoice(token, request)));
    }
    @PostMapping("/essay")
    public ResponseEntity<SuccessResponse<?>>  saveUserEssay (@RequestHeader(value = "Authorization", required = false) String token, @RequestBody EssayRequest request){

        return ResponseEntity.ok(
                new SuccessResponse<>("success" ,essayService.postEssayProblem(token,request)));
    }
}

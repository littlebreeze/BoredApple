package com.a508.studyservice.controller;

import com.a508.studyservice.global.common.response.SuccessResponse;
import com.a508.studyservice.service.EssayServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/study-service/solve")
@RequiredArgsConstructor
public class SolvedController {

    private final EssayServiceImpl essayService;
    @GetMapping("/five")
    public ResponseEntity<SuccessResponse<?>> getFiveAbilityController(@RequestHeader("Authorization") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }

    @GetMapping("/specific/{year}/{month}/{day}")
    public ResponseEntity<SuccessResponse<?>> getSpecificStudyController( @PathVariable("year") int year,
                                                                          @PathVariable("month") int month,
                                                                          @PathVariable("day") int day,
                                                                         @RequestHeader("Authorization") String token){
        LocalDate date = LocalDate.of(year, month, day);
        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }


    @GetMapping("/month/{month}")
    public ResponseEntity<SuccessResponse<?>>  getMonthStudyController ( @PathVariable("month") int month , @RequestHeader("Authoriztion") String token){

        return ResponseEntity.ok(
                new SuccessResponse<>(HttpStatus.OK.value() ," "));
    }



}

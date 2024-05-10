package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional( readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class SentenceInsertServiceImpl  implements  SentenceInsertService{

    private final SentenceInsertRepository sentenceInsertRepository;
    private final TodayLearningRepository todayLearningRepository;
    private final ChoiceRepository choiceRepository;


    @Override
    public List<ProblemResponse> getSentenceProblems(String token, LocalDateTime date) {
        log.info(token);
        log.info(String.valueOf(date));
        int userId = 1;
        /*
        userId 불러오는 feign 필요
         */

//        if( token == null)  {userId =1; }
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "문장삽입";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());


        List<ProblemResponse> problemResponses = new ArrayList<>();
        List<SentenceInsert> sentenceInsertList = new ArrayList<>();

        for( TodayLearning todayLearning : todayLearnings){
         sentenceInsertList.add(sentenceInsertRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)));
        }

        for(SentenceInsert sentenceInsert : sentenceInsertList){

            ChoiceSolved choiceSolved = choiceRepository.findByUserIdAndTypeAndProblemId(userId,type,sentenceInsert.getId());
            ProblemResponse response = sentenceInsertToDto(sentenceInsert);
            if( choiceSolved != null ) {
                response.setAnswer(choiceSolved.getAnswer());
                response.setUserAnswer(choiceSolved.getUserAnswer());
                response.setCorrect(choiceSolved.isCorrect());
            }
            problemResponses.add(response);

        }

        return problemResponses;
    }


    public ProblemResponse sentenceInsertToDto (SentenceInsert sentenceInsert){
        return ProblemResponse.builder()
                .category(sentenceInsert.getCategory())
                .type("문장삽입")
                .problemId(sentenceInsert.getId())
                .option1(sentenceInsert.getOption1())
                .option2(sentenceInsert.getOption2())
                .option3(sentenceInsert.getOption3())
                .content(sentenceInsert.getContent())
                .build();

    }



}

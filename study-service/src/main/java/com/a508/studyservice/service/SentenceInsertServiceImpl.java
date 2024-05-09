package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.ParagraphOrder;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.parsing.Problem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
                response.setCreatedAt(choiceSolved.getCreatedAt());
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
                .title("다음 문장이 들어가야 할 적절한 위치를 고르세요!!")
                .question(sentenceInsert.getInsertSentence())
                .option1(sentenceInsert.getOption1())
                .option2(sentenceInsert.getOption2())
                .option3(sentenceInsert.getOption3())
                .content(sentenceInsert.getContent())
                .build();

    }



}

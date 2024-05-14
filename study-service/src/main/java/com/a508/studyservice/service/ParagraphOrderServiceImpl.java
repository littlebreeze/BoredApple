package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.ParagraphOrder;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.ParagraphOrderRepository;
import com.a508.studyservice.repository.TodayLearningRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional( readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ParagraphOrderServiceImpl implements  ParagraphOrderService{

    private final ParagraphOrderRepository paragraphOrderRepository;
    private final TodayLearningRepository todayLearningRepository;
    private  final ChoiceRepository choiceRepository;
    private final UserServiceFeignClient userServiceFeignClient;

    @Override
    public List<ProblemResponse> getParagraphProblems(String token, LocalDateTime date ) {
        int userId = 0;
        if( token != null && token.length() >25) {
            String actualToken = token.substring(7);
            userId = userServiceFeignClient.getUserId(actualToken);
        }
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "순서맞추기";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());
        List<ParagraphOrder> orderList = new ArrayList<>();
        List<ProblemResponse> problemResponses = new ArrayList<>();

        for( TodayLearning todayLearning : todayLearnings){
            log.info("오늘의 학습 순서 :" + todayLearning);
            orderList.add(paragraphOrderRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)) );
        }

        for(ParagraphOrder paragraphOrder : orderList){
            ChoiceSolved choiceSolved = choiceRepository.findByUserIdAndTypeAndProblemId(userId,type,paragraphOrder.getId());
            ProblemResponse response = orderToDto(paragraphOrder);
            if( choiceSolved != null ) {
                response.setAnswer(choiceSolved.getAnswer());
                response.setUserAnswer(choiceSolved.getUserAnswer());
                response.setCorrect(choiceSolved.isCorrect());
            }
            problemResponses.add(response);

        }

        return problemResponses;
    }


    public ProblemResponse orderToDto(ParagraphOrder order){
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setContent(order.getFirstSentence());
        problemResponse.setOption1(order.getOption1());
        problemResponse.setOption2(order.getOption2());
        problemResponse.setOption3(order.getOption3());
        problemResponse.setCategory(order.getCategory());
        problemResponse.setProblemId(order.getId());
        problemResponse.setType("순서맞추기");

        return problemResponse;
    }
}

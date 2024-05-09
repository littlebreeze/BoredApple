package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.ParagraphOrder;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.ParagraphOrderRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional( readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ParagraphOrderServiceImpl implements  ParagraphOrderService{

    private final ParagraphOrderRepository paragraphOrderRepository;
    private final TodayLearningRepository todayLearningRepository;
    private  final ChoiceRepository choiceRepository;


    @Override
    public List<ProblemResponse> getParagraphProblems(String token, LocalDateTime date ) {
        int userId = 1;
        /*
        token 활용 user Feign 해야함
         */

        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "순서맞추기";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());
        List<ParagraphOrder> orderList = new ArrayList<>();
        List<ProblemResponse> problemResponses = new ArrayList<>();

        for( TodayLearning todayLearning : todayLearnings){
            orderList.add(paragraphOrderRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)) );
        }

        for(ParagraphOrder paragraphOrder : orderList){
            ChoiceSolved choiceSolved = choiceRepository.findByUserIdAndTypeAndProblemId(userId,type,paragraphOrder.getId());
            ProblemResponse response = orderToDto(paragraphOrder);
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


    public ProblemResponse orderToDto(ParagraphOrder order){
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setTitle("첫 번째 문장을 읽고 이어서 문장의 순서를 정하세요");
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

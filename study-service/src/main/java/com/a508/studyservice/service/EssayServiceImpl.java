package com.a508.studyservice.service;


import com.a508.studyservice.dto.request.EssayRequest;
import com.a508.studyservice.dto.response.EssayResponse;
import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.EssaySolved;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.entity.TopicProblem;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.EssayRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EssayServiceImpl  implements  EssayService{

    private final EssayRepository essayRepository;
    private final TopicRepository topicRepository;
    private final TodayLearningRepository todayLearningRepository;


    @Override
    public List<EssayResponse> getProblemList(String token, LocalDateTime date) {
        int userId = 0;
        if( token == null) userId = 1;
        /*
        * User Feign 필요
        * */
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "주제맞추기";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());

        List<EssayResponse> problemResponses = new ArrayList<>();
        for( TodayLearning todayLearning : todayLearnings){
            TopicProblem topicProblem = topicRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR));
            problemResponses.add(topicToDto(topicProblem));
        }

        if( todayLearnings.get(0).isCorrect()){
            for(int idx = 0 ; idx < todayLearnings.size() ; idx++){
                EssaySolved essaySolved = essayRepository.findByProblemId(todayLearnings.get(idx).getProblemId());
                problemResponses.get(idx).setUserAnswer(essaySolved.getMyAnswer());
                problemResponses.get(idx).setAnswer(essaySolved.getAnswer());
                problemResponses.get(idx).setSimilarity(essaySolved.getSimilarity());
            }
        }


        return problemResponses;
    }

    @Override
    public List<EssayResponse> postEssayProblem(String token, EssayRequest request) {
        log.info(request.toString());

        int userId = 1;
        /*
        token 로직 처리 필요 (feign)
         */
        String type = "주제맞추기";
        List<EssayResponse> essayResponses = new ArrayList<>();
        int size = request.getProblemId().size();

        for( int idx = 0 ; idx  < size ; idx++){
            TopicProblem topicProblem = topicRepository.findById(request.getProblemId().get(idx)).orElseThrow(()-> new BaseException(ErrorCode.NOT_EXIST_QUESTION));
            /*
            feign 요청을 통한 Essay의 유사도 받아오기
             */

            int similarity = 77;

            EssaySolved essaySolved = essayRepository.save( EssaySolved.builder()
                            .problemId(request.getProblemId().get(idx))
                            .answer(topicProblem.getAnswer())
                            .category(type)
                            .similarity(similarity)
                            .myAnswer(request.getMyAnswer().get(idx))
                            .userId(userId)
                            .build());

            essayResponses.add(EssayResponse.builder()
                            .problemId(request.getProblemId().get(idx))
                            .userAnswer(request.getMyAnswer().get(idx))
                            .answer(topicProblem.getAnswer())
                            .type(type)
                            .similarity(similarity)
                            .createdAt(essaySolved.getCreatedAt())
                            .text(topicProblem.getContent())
                            .build());
            log.info(topicProblem.toString());
        }

        return essayResponses;
    }


    public EssayResponse topicToDto (TopicProblem topicProblem){
        return EssayResponse.builder()
                .title(" 다음 글을 읽고 주제를 요약하세요!")
                .text(topicProblem.getContent())
                .type("주제맞추기")
                .build();

    }

}

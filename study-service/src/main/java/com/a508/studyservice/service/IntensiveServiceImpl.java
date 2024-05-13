package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.IntensiveRepository;
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
@Transactional(readOnly =true)
@RequiredArgsConstructor
@Slf4j
public class IntensiveServiceImpl  implements  IntensiveService{

    private final IntensiveRepository intensiveRepository;
    private final TodayLearningRepository todayLearningRepository;
    private final ChoiceRepository choiceRepository;
    private final UserServiceFeignClient userServiceFeignClient;


    @Override
    public List<ProblemResponse> getIntensiveProblems(String token,LocalDateTime dateTime) {
        int userId = 0;
        if( token != null && token.length() >25) {
            String actualToken = token.substring(7);
            userId = userServiceFeignClient.getUserId(actualToken);
        }

        if( dateTime == null) dateTime = LocalDateTime.now();
        LocalDateTime startDate = LocalDateTime.of(dateTime.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(dateTime.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "정독훈련";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());
        List<Intensive> intensiveList = new ArrayList<>();
        List<ProblemResponse> problemResponses = new ArrayList<>();

        for( TodayLearning todayLearning : todayLearnings){
            intensiveList.add(intensiveRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)) );
        }


        for(Intensive intensive : intensiveList){
            ChoiceSolved choiceSolved = choiceRepository.findByUserIdAndTypeAndProblemId(userId,type,intensive.getId());
            ProblemResponse response = intensiveToDto(intensive);
            if( choiceSolved != null ) {
                response.setAnswer(choiceSolved.getAnswer());
                response.setUserAnswer(choiceSolved.getUserAnswer());
                response.setCorrect(choiceSolved.isCorrect());
            }
            problemResponses.add(response);
        }
        return problemResponses;


    }

    @Override
    public List<ProblemResponse> getTodayIntensive(String token) {
        return null;
    }

    public ProblemResponse  intensiveToDto(Intensive intensive){
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setContent( splitSentence (intensive.getContent()));
        problemResponse.setOption1(intensive.getOption1());
        problemResponse.setOption2(intensive.getOption2());
        problemResponse.setOption3(intensive.getOption3());
        problemResponse.setCategory(intensive.getCategory());
        problemResponse.setProblemId(intensive.getId());
        problemResponse.setType("정독훈련");

        return problemResponse;
    }

    public String splitSentence(String sentence) {
        String[] parts = sentence.split("(?<=[?!.])");
        StringBuilder answer= new StringBuilder();

        //  " | "  을 기준으로 보여지게 할 수 있게 설정
        for(String part : parts){
            answer.append(part).append(" | ");
        }
        return answer.toString();
    }

}

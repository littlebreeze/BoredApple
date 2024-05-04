package com.a508.studyservice.service;

import com.a508.studyservice.dto.request.ProblemRequest;
import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.IntensiveRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
@Slf4j
public class IntensiveServiceImpl  implements  IntensiveService{

    private final IntensiveRepository intensiveRepository;
    private final TodayLearningRepository todayLearningRepository;


    @Override
    public List<ProblemResponse> getIntensiveProblems(String token) {
        int userId = 1;
        LocalDateTime localDateTime = LocalDateTime.now();
        log.info(" 요청을 보낸 시간은 : "+String.valueOf(localDateTime));
        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAt(userId,localDateTime);
        if( todayLearnings.isEmpty()) todayLearnings = todayLearningRepository.findByUserId(0);  // 테스트용
        List<Intensive> intensiveList = new ArrayList<>();
        List<ProblemResponse> problemResponses = new ArrayList<>();
        for( TodayLearning todayLearning : todayLearnings){
            intensiveList.add(intensiveRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)) );
        }

        for(Intensive intensive : intensiveList){
            problemResponses.add(intensiveToDto(intensive));
        }

        return problemResponses;

    }

    @Override
    public List<ProblemResponse> getTodayIntensive(String token) {
        return null;
    }

    public ProblemResponse  intensiveToDto(Intensive intensive){
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setTitle("차례대로 나오는 문장들을 집중해서 읽고 문제를 맞추세요!");
        problemResponse.setContent( splitSentence (intensive.getContent()));
        problemResponse.setQuestion(intensive.getQuestion());
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

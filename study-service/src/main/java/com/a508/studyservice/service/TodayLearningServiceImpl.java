package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.TodayLearningResponse;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

@Service
@RequiredArgsConstructor
@Transactional( readOnly = true)
@Slf4j
public class TodayLearningServiceImpl implements TodayLearningService {

    private final TodayLearningRepository todayLearningRepository;
    //    private final UserServiceFeignClient userServiceFeignClient;
    private final ChoiceRepository choiceRepository;

    @Override
    public List<TodayLearningResponse> getTodayLearning(String token) {
        log.info(" token 정보가 들어옵니다. ");
        Integer userId = 1;
        /*
        Feign 을 통한 token 로직 추가되어야 함.
        필요한 거 userId, 선호 카테고리
         */
        LocalDateTime date = LocalDateTime.now();
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝

        List<TodayLearningResponse> todayLearningResponses = new ArrayList<>();

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(userId,startDate,endDate);
        log.info(String.valueOf(todayLearnings));


        if(todayLearnings.isEmpty()){
            log.warn(" 해당 유저는 신규 가입 유저거나 GUEST 입니다. ");
           TodayLearningResponse dummy1 = todayLearningFactory("정독훈련","인문");
           TodayLearningResponse dummy2 = todayLearningFactory("문장삽입","인문");
           TodayLearningResponse dummy3 = todayLearningFactory("주제맞추기","사회");
            todayLearningResponses.add(dummy1);
            todayLearningResponses.add(dummy2);
            todayLearningResponses.add(dummy3);
            newbie(userId);
            return todayLearningResponses;
        } else{
            log.info(" 오늘의 학습 조회가 성공적으로 이루어졌습니다. ");
        }

        TreeSet<String> treeSet = new TreeSet<>();
        List<Boolean> booleanList = new ArrayList<>();

        for(TodayLearning todayLearning : todayLearnings)treeSet.add(todayLearning.getType());

        for(TodayLearning todayLearning : todayLearnings ){
            if( treeSet.contains(todayLearning.getType())) {
                todayLearningResponses.add(todayLearningToDto(todayLearning));
                treeSet.remove(todayLearning.getType());
            }

        }
        return todayLearningResponses;
    }


    // 더미 오늘의 학습 팩토리 매서드
    public TodayLearningResponse todayLearningFactory(String type, String category){
        TodayLearningResponse todayLearningResponse = new TodayLearningResponse();
        todayLearningResponse.setCategory(category);
        todayLearningResponse.setType(type);
        todayLearningResponse.setSolved(false);
        return todayLearningResponse;
    }

    //Entity -> Dto 변환
    public TodayLearningResponse todayLearningToDto(TodayLearning todayLearning){
        return TodayLearningResponse.builder()
                .category(todayLearning.getCategory())
                .type(todayLearning.getType())
                .solved(todayLearning.isCorrect())
                .build();
    }


    // 신규 가입 유저들 오늘의 학습 데이터 생성
    @Transactional
    public void newbie(Integer userId){
        if(userId == 0 ) return; // 게스트 유저면 데이터를 만들지 않음.
        log.info(  " user 번호 :  " + userId +  "님이 오늘의 학습을 생성하셨습니다. ");
        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserId(0);
        for( TodayLearning todayLearning : todayLearnings){
                todayLearningRepository.save(TodayLearning.builder()
                                .category(todayLearning.getCategory())
                                .type(todayLearning.getType())
                                .correct(false)
                                .userId(userId)
                                .problemId(todayLearning.getProblemId())
                                .build());
            }
    }



}

package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.TreeSet;

import com.a508.studyservice.dto.response.FeignList;
import com.a508.studyservice.feign.UserServiceFeignClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a508.studyservice.dto.response.TodayLearningResponse;
import com.a508.studyservice.dto.response.UserFeignResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.entity.TopicProblem;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.IntensiveRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.TopicRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TodayLearningServiceImpl implements TodayLearningService {

    private final TodayLearningRepository todayLearningRepository;
    //    private final UserServiceFeignClient userServiceFeignClient;
    private final ChoiceRepository choiceRepository;
    private final IntensiveRepository intensiveRepository;
    private final SentenceInsertRepository sentenceInsertRepository;
    private final TopicRepository topicRepository;
    private  final UserServiceFeignClient userServiceFeignClient;

    private static final List<String> categories = new ArrayList<>(Arrays.asList("인문", "사회", "과학", "예술", "기술"));
    @Override
        public List<TodayLearningResponse> getTodayLearning(String token) {

        int userId = 0;
        if( token != null) { userId = userServiceFeignClient.getUserId(token);}
        log.info("userId = " + userId );
        log.info(" token 정보가 들어옵니다. ");
            List<String> personalCategories = new ArrayList<>();
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
                newbie(userId,personalCategories);
                    return todayLearningResponses;
            } else{
                log.info(" 오늘의 학습 조회가 성공적으로 이루어졌습니다. ");
            }

            TreeSet<String> treeSet = new TreeSet<>();
            List<Boolean> booleanList = new ArrayList<>();

            for(TodayLearning todayLearning : todayLearnings)treeSet.add(todayLearning.getType());

            for(TodayLearning todayLearning : todayLearnings ){
                if( treeSet.contains(todayLearning.getType())) {
                    List<ChoiceSolved> choiceSolvedResponseList = choiceRepository.findByTypeAndProblemId(todayLearning.getType(),todayLearning.getProblemId());
                    TodayLearningResponse response = todayLearningToDto(todayLearning);
                    int difficulty = 0 ;
                    for( ChoiceSolved choiceSolved : choiceSolvedResponseList) if(choiceSolved.isCorrect()) difficulty++;
                    int size = Math.max(choiceSolvedResponseList.size() , 1);
                    double ratio = (double)difficulty / size;
                    if( ratio >= 0.2) response.setDifficulty(5);
                    if( ratio >= 0.4) response.setDifficulty(4);
                    if( ratio >= 0.6) response.setDifficulty(3);
                    if( ratio >= 0.8) response.setDifficulty(2);
                    if( ratio >= 1) response.setDifficulty(1);

                    if( size <= 3 ) response.setDifficulty(2);

                    todayLearningResponses.add(response);

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
        todayLearningResponse.setDifficulty(2);
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
    public void newbie(Integer userId, List<String> personalCategories){
        //정독훈련, 문장삽입, 주제맞추기
//        UserFeignResponse userFeignResponse = new UserFeignResponse(1,new ArrayList<>());
        /*
        Feign 요청을 통해서
         */
        int size = personalCategories.size();

        if( size < 3 ) {
            while(personalCategories.size() < 3){
                Collections.shuffle(categories);
                if(!personalCategories.contains(categories.get(0))) {personalCategories.add(categories.get(0));}
            }
        }

        // 카테고리
        String fir = personalCategories.get(0);
        String sec = personalCategories.get(1);
        String thi = personalCategories.get(2);
        List<Intensive>  intensiveList = intensiveRepository.findByCategory(fir);
        List<SentenceInsert> sentenceInsertList = sentenceInsertRepository.findByCategory(sec);
        List<TopicProblem> topicProblemList = topicRepository.findByCategory(thi);

        log.info( "정독훈련의 문제들의 값이 들어온지 : " +String.valueOf(intensiveList.size()));
        log.info("정독훈련의 문제들의 값이 들어온지 : "+ String.valueOf(sentenceInsertList.size()));
        log.info("정독훈련의 문제들의 값이 들어온지 : "+ String.valueOf(topicProblemList.size()));
        for(int idx = 0 ; idx < 3 ; idx++){
            todayLearningRepository.save(makeEntity(userId, intensiveList.get(idx).getId(), "정독훈련", fir));
            todayLearningRepository.save(makeEntity(userId, sentenceInsertList.get(idx).getId(), "문장삽입", fir));
            todayLearningRepository.save(makeEntity(userId, topicProblemList.get(idx).getId(), "주제맞추기", fir));
        }





    }

    // 오늘의학습 인스턴스 생성  메소드
    static TodayLearning makeEntity(int userId, int problemId,String type, String category){
        return TodayLearning.builder()
            .userId(userId)
            .problemId(problemId)
            .type(type)
            .category(category)
            .correct(false)
            .createAt(LocalDateTime.now())
            .build();
    }


}

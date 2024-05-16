package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a508.studyservice.dto.request.EssayRequest;
import com.a508.studyservice.dto.response.EssayResponse;
import com.a508.studyservice.dto.response.SimilarityResponse;
import com.a508.studyservice.entity.EssaySolved;
import com.a508.studyservice.entity.FiveAbility;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.entity.TopicProblem;
import com.a508.studyservice.feign.SimilarityServiceFeignClient;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.EssayRepository;
import com.a508.studyservice.repository.FiveAbilityRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.TopicRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EssayServiceImpl  implements  EssayService{

    private final EssayRepository essayRepository;
    private final TopicRepository topicRepository;
    private final TodayLearningRepository todayLearningRepository;
    private final UserServiceFeignClient userServiceFeignClient;
    private final SimilarityServiceFeignClient similarityServiceFeignClient;
    private final FiveAbilityRepository fiveAbilityRepository;



    @Override
    public List<EssayResponse> getProblemList(String token, LocalDateTime date) {

        int userId = 0;
        if(token != null) {
        String actualToken = token.substring(7);
        userId = userServiceFeignClient.getUserId(actualToken);
        }
        log.info("topic 주제에 들어온 userId : " + userId);
        log.info(token);

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
            log.info("오늘의 학습 : " + todayLearning);
            TopicProblem topicProblem = topicRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR));
            problemResponses.add(topicToDto(topicProblem));
        }

        if( todayLearnings.get(0).isCorrect()){
            for(int idx = 0 ; idx < todayLearnings.size() ; idx++){
                EssaySolved essaySolved = essayRepository.findByUserIdAndProblemId(userId,todayLearnings.get(idx).getProblemId());
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
        int userId = 0;
        if(token == null ) throw new BaseException(ErrorCode.NOT_AUTHORIZATION_POST);
        if( token.length() >25) {
            String actualToken = token.substring(7);
            userId = userServiceFeignClient.getUserId(actualToken);
        }
        String type = "주제맞추기";
        List<EssayResponse> essayResponses = new ArrayList<>();
        int size = request.getProblemId().size();

        for( int idx = 0 ; idx  < size ; idx++){
            TopicProblem topicProblem = topicRepository.findById(request.getProblemId().get(idx)).orElseThrow(()-> new BaseException(ErrorCode.NOT_EXIST_QUESTION));
            String[] strings = new String[2];
            strings[0] = topicProblem.getAnswer();
            strings[1] = request.getMyAnswer().get(idx);
           SimilarityResponse similarityResponse = similarityServiceFeignClient.essaySimilarity(strings);
            int similarity = similarityResponse.getRatio();
            log.info("유사도의 결과값은 : " + similarity);

            if( similarity >= 60) {
                FiveAbility fiveAbility = fiveAbilityRepository.findByUserId(userId);
                if(fiveAbility ==null){
                    fiveAbility = fiveAbilityRepository.save(FiveAbility.builder()
                        .userId(userId)
                        .fact(1)
                        .inference(1)
                        .voca(1)
                        .recognition(1)
                        .speed(1)
                        .build());
                }
                fiveAbilityRepository.save(FiveAbility.builder()
                    .id(fiveAbility.getId())
                    .userId(userId)
                    .fact(fiveAbility.getFact() )
                    .inference(fiveAbility.getInference())
                    .voca(fiveAbility.getVoca())
                    .recognition(fiveAbility.getRecognition()+1)
                    .speed(fiveAbility.getSpeed())
                    .build());


            }

            essayRepository.save( EssaySolved.builder()
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
                            .content(topicProblem.getContent())
                            .build());
            log.info(topicProblem.toString());
        }
        LocalDateTime date = LocalDateTime.now();
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        for (TodayLearning todayLearning :todayLearnings) {
            todayLearningRepository.save(TodayLearning.builder()
                .id(todayLearning.getId())
                .userId(todayLearning.getUserId())
                .problemId(todayLearning.getProblemId())
                .type(todayLearning.getType())
                .category(todayLearning.getCategory())
                .correct(true)
                .createAt(todayLearning.getCreateAt())
                .build());
        }


        return essayResponses;
    }


    public EssayResponse topicToDto (TopicProblem topicProblem){
        return EssayResponse.builder()
                .content(topicProblem.getContent())
                .problemId(topicProblem.getId())
                .type("주제맞추기")
                .build();

    }

}

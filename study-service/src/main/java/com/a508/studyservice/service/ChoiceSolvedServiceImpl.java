package com.a508.studyservice.service;


import com.a508.studyservice.dto.request.ChoiceRequest;
import com.a508.studyservice.dto.response.ChoiceSolvedResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ChoiceSolvedServiceImpl  implements  ChoiceSolvedService{

    private final ChoiceRepository choiceRepository;
    private final IntensiveRepository intensiveRepository;
    private final SentenceInsertRepository sentenceInsertRepository;
    private final ParagraphOrderRepository paragraphOrderRepository;
    private final VocaRepository vocaRepository;



    @Override
    public List<ChoiceSolvedResponse> postChoice(String token, ChoiceRequest choiceRequest) {
        int userId = 1;
        /*
        userId , token을 통한 Feign 요청 보내야함
         */

        String type = choiceRequest.getType();

        List<ChoiceSolvedResponse> choiceSolvedResponses = new ArrayList<>();

        int size = choiceRequest.getMyAnswer().size();
        for(int idx = 0 ; idx < size ; idx++) {
            Integer answer = -1;
            boolean flag = switch (type) {
                case "정독훈련" -> {
                    Integer fetchedAnswer = intensiveRepository.findById(choiceRequest.getProblemId().get(idx)).get().getAnswer();
                    answer = fetchedAnswer;
                    yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
                }
                case "순서맞추기" -> {
                    Integer fetchedAnswer = paragraphOrderRepository.findById(choiceRequest.getProblemId().get(idx)).get().getAnswer();
                    answer = fetchedAnswer;
                    yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
                }
                case "문장삽입" -> {
                    Integer fetchedAnswer = sentenceInsertRepository.findById(choiceRequest.getProblemId().get(idx)).get().getAnswer();
                    answer = fetchedAnswer;
                    yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
                }
                case "어휘" -> {
                    Integer fetchedAnswer = vocaRepository.findById(choiceRequest.getProblemId().get(idx)).get().getAnswer();
                    answer = fetchedAnswer;
                    yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
                }
                default -> false;
            };
            ChoiceSolved savedChoiceSolved = choiceRepository.save(ChoiceSolved.builder()
                    .answer(answer)
                    .correct(flag)
                    .type(choiceRequest.getType())
                    .userId(userId)
                    .problemId(choiceRequest.getProblemId().get(idx))
                    .userAnswer(choiceRequest.getMyAnswer().get(idx))
                    .build());
            log.info(savedChoiceSolved.toString());
                choiceSolvedResponses.add(ChoiceSolvedResponse.builder()
                                .createdAt(savedChoiceSolved.getCreatedAt())
                                .userAnswer(savedChoiceSolved.getUserAnswer())
                                .answer(savedChoiceSolved.getAnswer())
                                .correct(savedChoiceSolved.isCorrect())
                                .problemId(choiceRequest.getProblemId().get(idx))
                                .type(type)
                                .build());
        } //for 문
        log.info(choiceSolvedResponses.toString());
        return choiceSolvedResponses;
    }
}


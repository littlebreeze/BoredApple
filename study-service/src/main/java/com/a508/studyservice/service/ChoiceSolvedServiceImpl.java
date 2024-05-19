package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.a508.studyservice.dto.request.ChoiceRequest;
import com.a508.studyservice.dto.response.ChoiceSolvedResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.FiveAbility;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.FiveAbilityRepository;
import com.a508.studyservice.repository.IntensiveRepository;
import com.a508.studyservice.repository.ParagraphOrderRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.VocaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class ChoiceSolvedServiceImpl implements ChoiceSolvedService {

	private final ChoiceRepository choiceRepository;
	private final IntensiveRepository intensiveRepository;
	private final SentenceInsertRepository sentenceInsertRepository;
	private final ParagraphOrderRepository paragraphOrderRepository;
	private final VocaRepository vocaRepository;
	private final TodayLearningRepository todayLearningRepository;
	private final UserServiceFeignClient userServiceFeignClient;
	private final FiveAbilityRepository fiveAbilityRepository;

	@Override
	public List<ChoiceSolvedResponse> postChoice(String token, ChoiceRequest choiceRequest) {
		int userId = 0;
        /*
        userId , token을 통한 Feign 요청 보내야함
         */
		if( token != null && token.length() >25) {
			String actualToken = token.substring(7);
			userId = userServiceFeignClient.getUserId(actualToken);
		}
		else throw  new BaseException(ErrorCode.EXIST_TOKEN_ERROR);

		log.info("객관식 문제 정답을 제출한 사람은 : " + (userId));

		String type = choiceRequest.getType();

		List<ChoiceSolvedResponse> choiceSolvedResponses = new ArrayList<>();

		int size = choiceRequest.getMyAnswer().size();
		for (int idx = 0; idx < size; idx++) {
			log.info("객관식 값들을 순횐합니다 " +  (idx+1) +"번 째");
			Integer answer = -1;
			boolean flag = switch (type) {
				case "정독훈련" -> {
					Integer fetchedAnswer = intensiveRepository.findById(choiceRequest.getProblemId().get(idx))
						.get()
						.getAnswer();
					answer = fetchedAnswer;
					yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
				}
				case "순서맞추기" -> {
					Integer fetchedAnswer = paragraphOrderRepository.findById(choiceRequest.getProblemId().get(idx))
						.get()
						.getAnswer();
					answer = fetchedAnswer;
					yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
				}
				case "문장삽입" -> {
					Integer fetchedAnswer = sentenceInsertRepository.findById(choiceRequest.getProblemId().get(idx))
						.get()
						.getAnswer();
					answer = fetchedAnswer;
					yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
				}
				case "어휘" -> {
					Integer fetchedAnswer = vocaRepository.findById(choiceRequest.getProblemId().get(idx))
						.get()
						.getAnswer();
					answer = fetchedAnswer;
					yield fetchedAnswer.equals(choiceRequest.getMyAnswer().get(idx));
				}
				default -> false;
			};
			if( flag ){
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

				if( type.equals("정독훈련")) {
					fiveAbilityRepository.save(FiveAbility.builder()
						.id(fiveAbility.getId())
						.userId(userId)
						.fact(fiveAbility.getFact() +1)
						.inference(fiveAbility.getInference())
						.voca(fiveAbility.getVoca())
						.recognition(fiveAbility.getRecognition())
						.speed(fiveAbility.getSpeed())
						.build());
					}
				if( type.equals("순서맞추기")) {
					fiveAbilityRepository.save(FiveAbility.builder()
						.id(fiveAbility.getId())
						.userId(userId)
						.fact(fiveAbility.getFact() )
						.inference(fiveAbility.getInference())
						.voca(fiveAbility.getVoca())
						.recognition(fiveAbility.getRecognition())
						.speed(fiveAbility.getSpeed()+1)
						.build());
				}
				if( type.equals("문장삽입")) {
					fiveAbilityRepository.save(FiveAbility.builder()
						.id(fiveAbility.getId())
						.userId(userId)
						.fact(fiveAbility.getFact() )
						.inference(fiveAbility.getInference()+1)
						.voca(fiveAbility.getVoca())
						.recognition(fiveAbility.getRecognition())
						.speed(fiveAbility.getSpeed())
						.build());
				}
				if( type.equals("어휘")) {
					fiveAbilityRepository.save(FiveAbility.builder()
						.id(fiveAbility.getId())
						.userId(userId)
						.fact(fiveAbility.getFact() )
						.inference(fiveAbility.getInference())
						.voca(fiveAbility.getVoca()+1)
						.recognition(fiveAbility.getRecognition())
						.speed(fiveAbility.getSpeed())
						.build());
				}

			}
			ChoiceSolved savedChoiceSolved = choiceRepository.save(ChoiceSolved.builder()
				.answer(answer)
				.correct(flag)
				.type(choiceRequest.getType())
				.userId(userId)
				.problemId(choiceRequest.getProblemId().get(idx))
				.userAnswer(choiceRequest.getMyAnswer().get(idx))
				.spendTime(choiceRequest.getSpendTime())
				.build());

			log.info(savedChoiceSolved.toString());

			LocalDateTime date = LocalDateTime.now();
			LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
			LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
			List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);

			for( TodayLearning todayLearning : todayLearnings){
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


			choiceSolvedResponses.add(ChoiceSolvedResponse.builder()
				.createdAt(savedChoiceSolved.getCreatedAt())
				.userAnswer(savedChoiceSolved.getUserAnswer())
				.answer(savedChoiceSolved.getAnswer())
				.correct(savedChoiceSolved.isCorrect())
				.problemId(choiceRequest.getProblemId().get(idx))
				.type(type)
				.createdAt(date)
				.build());
		} //for 문
		log.info(choiceSolvedResponses.toString());
		return choiceSolvedResponses;
	}
}


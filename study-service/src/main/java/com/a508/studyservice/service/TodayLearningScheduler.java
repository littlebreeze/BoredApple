package com.a508.studyservice.service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.PriorityQueue;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.a508.studyservice.dto.response.UserFeignResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.EssaySolved;
import com.a508.studyservice.entity.FiveAbility;
import com.a508.studyservice.entity.ParagraphOrder;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.EssayRepository;
import com.a508.studyservice.repository.FiveAbilityRepository;
import com.a508.studyservice.repository.IntensiveRepository;
import com.a508.studyservice.repository.ParagraphOrderRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.VocaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// @Component
@RequiredArgsConstructor
@Slf4j
@Service
public class TodayLearningScheduler {

	private final FiveAbilityRepository fiveAbilityRepository;
	private final TodayLearningRepository todayLearningRepository;
	private final ChoiceRepository choiceRepository;
	private final EssayRepository essayRepository;
	private final SentenceInsertRepository sentenceInsertRepository;
	private final ParagraphOrderRepository paragraphOrderRepository;
	private final VocaRepository vocaRepository;
	private final IntensiveRepository intensiveRepository;

	private static final List<String> categories = new ArrayList<>(Arrays.asList("인문", "사회", "과학", "예술", "기술"));

	@Transactional
	@Scheduled(cron = "0 0 0 * * ?")
	public void makeTodayLearning()throws NoSuchAlgorithmException{

		List<UserFeignResponse> userFeignResponses = new ArrayList<>();
		UserFeignResponse userFeignResponse = new UserFeignResponse(1,new ArrayList<>());
		userFeignResponses.add(userFeignResponse);
		/*
		user Feign 을 통해서 userId, 선호 카테고리들 받아옴
		 */

		log.info(userFeignResponses.toString());

		//유저 정보들을 순회하면서 유저들의 오늘의학습을 만들어주는 시작점
		for(UserFeignResponse userFeignResponse1 : userFeignResponses){
			int userId = userFeignResponse1.getUserId();
			List<String> categoryList = userFeignResponse1.getCategoryList();
			Collections.shuffle(categoryList);
			int size = categoryList.size();
			size = Math.min(3, size);

			List<ChoiceSolved> choiceSolvedList = choiceRepository.findByUserId(userId);
			List<EssaySolved> essaySolvedList = essayRepository.findByUserId(userId);
			FiveAbility fiveAbility = fiveAbilityRepository.findByUserId(userId);
			PriorityQueue<Ability> abilities = new PriorityQueue<>();
			abilities.add( new Ability("정독훈련", fiveAbility.getFact()));
			abilities.add( new Ability("순서맞추기", fiveAbility.getInference()));
			abilities.add( new Ability("문장삽입", fiveAbility.getInference()));
			abilities.add( new Ability("주제맞추기", fiveAbility.getRecognition()));
			abilities.add( new Ability("어휘", fiveAbility.getVoca()));

			List<String> abilityList = new ArrayList<>();
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			log.info(abilityList.toString());

			// 인문, 사회, 과학/기술, 예술, 언어

			if( size < 3 ) {
				while(categoryList.size() < 3){
					Collections.shuffle(categories);
					if(!categoryList.contains(categories.get(0))) {categoryList.add(categories.get(0));}
				}
			}
			log.info(categoryList.toString());
			log.info(abilityList.toString());

			for( int idx = 0 ; idx < 3 ; idx++){
				String type = abilityList.get(idx);
				String category = categoryList.get(idx);
				log.info( "String = " +  type );
				if(type.equals("순서맞추기")){
					List<ParagraphOrder> paragraphOrders = paragraphOrderRepository.findByCategory(type);
					Collections.shuffle(paragraphOrders);
					l: for(ParagraphOrder paragraphOrder : paragraphOrders) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), paragraphOrder.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}

					}
				}

				if(type.equals("문장삽입")){
					List<SentenceInsert> sentenceInsertList = sentenceInsertRepository.findByCategory(type);
					Collections.shuffle(sentenceInsertList);
					l: for(SentenceInsert sentenceInsert : sentenceInsertList) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), sentenceInsert.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}

					}
				}
				if(type.equals("어휘")){

				}
				if(type.equals("정독훈련")){

				}
				if(type.equals("주제맞추기")){

				}
			}




		} // UserResponses



	}


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

	static class Ability implements  Comparable<Ability>{
		String category;
		int score;
		Ability(String category , int score){
			this.category =category;
			this.score = score;
		}

		@Override
		public int compareTo(Ability o) {
			return -(o.score - this.score);
		}

		@Override
		public String toString() {
			return "Ability{" +
				"category='" + category + '\'' +
				", score=" + score +
				'}';
		}
	}


}

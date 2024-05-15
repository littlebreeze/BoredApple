package com.a508.studyservice.service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.PriorityQueue;

import com.a508.studyservice.dto.response.FeignList;
import com.a508.studyservice.entity.*;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.a508.studyservice.dto.response.UserFeignResponse;

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
	private final UserServiceFeignClient userServiceFeignClient;
	private final TopicRepository topicRepository;
	private static final List<String> categories = new ArrayList<>(Arrays.asList("인문", "사회", "과학", "예술", "기술"));

	@Transactional
	@Scheduled(cron = "0 0 0 * * ?")
	public void makeTodayLearning()throws NoSuchAlgorithmException{


		FeignList feignList = userServiceFeignClient.getAllUser();
		List<UserFeignResponse> userFeignResponses = feignList.getUsers();
		/*
		user Feign 을 통해서 userId, 선호 카테고리들 받아옴
		 */

		log.info(userFeignResponses.toString());

		//유저 정보들을 순회하면서 유저들의 오늘의학습을 만들어주는 시작점
		for(UserFeignResponse userFeignResponse1 : userFeignResponses){
			int userId = userFeignResponse1.getUserId();
			List<String> categoryList = userFeignResponse1.getCategories();
			Collections.shuffle(categoryList);
			//선호 카테고리의 개수를 정하자
			int size = categoryList.size();
			size = Math.min(3, size);

			List<ChoiceSolved> choiceSolvedList = choiceRepository.findByUserId(userId);
			List<EssaySolved> essaySolvedList = essayRepository.findByUserId(userId);
			FiveAbility fiveAbility = fiveAbilityRepository.findByUserId(userId);
			if(fiveAbility == null ) {
				fiveAbility = FiveAbility.builder()
					.userId(userId)
					.fact(1)
					.inference(1)
					.voca(1)
					.recognition(1)
					.speed(1)
					.build();
				fiveAbilityRepository.save(fiveAbility);
			}
			PriorityQueue<Ability> abilities = new PriorityQueue<>();
			abilities.add( new Ability("정독훈련", fiveAbility.getFact()));
			abilities.add( new Ability("순서맞추기", fiveAbility.getInference()));
			abilities.add( new Ability("문장삽입", fiveAbility.getSpeed()));
			abilities.add( new Ability("주제맞추기", fiveAbility.getRecognition()));
			abilities.add( new Ability("어휘", fiveAbility.getVoca()));

			// 부족한 능력 3가지를 추가.
			List<String> abilityList = new ArrayList<>();
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			abilityList.add(Objects.requireNonNull(abilities.poll()).category);
			log.info(abilityList.toString());

			// 인문, 사회, 과학/기술, 예술, 언어
			// 선호 카테고리가 적으면 넣어주자
			if( size < 3 ) {
				while(categoryList.size() < 3){
					Collections.shuffle(categories);
					if(!categoryList.contains(categories.get(0))) {categoryList.add(categories.get(0));}
				}
			}
			log.info(categoryList.toString());
			log.info(abilityList.toString());

			//오늘의 학습 3개를 만든다.
			w: for( int idx = 0 ; idx < 3 ; idx++){
				String type = abilityList.get(idx);
				String category = categoryList.get(idx);
				log.info( "String = " +  type );
				//type 마다 3개씩 생성
				int  count = 1 ;
				if(type.equals("순서맞추기")){
					List<ParagraphOrder> paragraphOrders = paragraphOrderRepository.findByCategory(category);
					Collections.shuffle(paragraphOrders);
					l: for(ParagraphOrder paragraphOrder : paragraphOrders) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), paragraphOrder.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}
						TodayLearning todayLearning =todayLearningRepository.save(makeEntity(userId,paragraphOrder.getId(),type,category));
						log.info(" userId의 값은 = "  + userId+ "  생성된 오늘의 학습은 = "+todayLearning  );
						count += 1;
						if( count == 4) continue w;
					}
				}

				if(type.equals("문장삽입")){
					List<SentenceInsert> sentenceInsertList = sentenceInsertRepository.findByCategory(category);
					Collections.shuffle(sentenceInsertList);
					l: for(SentenceInsert sentenceInsert : sentenceInsertList) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), sentenceInsert.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}
						TodayLearning todayLearning =todayLearningRepository.save(makeEntity(userId,sentenceInsert.getId(),type,category));
						log.info(" userId의 값은 = "  + userId+ "  생성된 오늘의 학습은 = "+todayLearning  );
						count += 1;
						if( count == 4) continue w;
					}
				}
				if(type.equals("어휘")){
					List<Voca> vocaList = vocaRepository.findAll();
					Collections.shuffle(vocaList);
					l: for(Voca voca : vocaList) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), voca.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}
						TodayLearning todayLearning =todayLearningRepository.save(makeEntity(userId,voca.getId(),type,category));
						log.info(" userId의 값은 = "  + userId+ "  생성된 오늘의 학습은 = "+todayLearning  );
						count += 1;
						if( count == 4) continue w;
					}

				}
				if(type.equals("정독훈련")){
					List<Intensive> intensiveList = intensiveRepository.findByCategory(category);
					Collections.shuffle(intensiveList);
					l: for(Intensive intensive : intensiveList) {
						for(ChoiceSolved choiceSolved :choiceSolvedList) {
							if(Objects.equals(choiceSolved.getProblemId(), intensive.getId()) && (choiceSolved.getType().equals(type) && choiceSolved.isCorrect())) continue  l;
						}
						 TodayLearning todayLearning = todayLearningRepository.save(makeEntity(userId,intensive.getId(),type,category));
						log.info(" userId의 값은 = "  + userId+ "  생성된 오늘의 학습은 = "+todayLearning  );
						count += 1;
						if( count == 4) continue w;
					}
				}
				if(type.equals("주제맞추기")){
					List<TopicProblem> topicProblemList = topicRepository.findByCategory(category);
					Collections.shuffle((topicProblemList));
					l: for(TopicProblem topicProblem : topicProblemList) {
						for(EssaySolved essaySolved :essaySolvedList) {
							if(Objects.equals(essaySolved.getProblemId(), topicProblem.getId())) continue  l;
						}
						TodayLearning todayLearning =todayLearningRepository.save(makeEntity(userId,topicProblem.getId(),type,category));
						log.info(" userId의 값은 = "  + userId+ "  생성된 오늘의 학습은 = "+todayLearning  );
						count += 1;
						if( count == 4) continue w;
					}

				}
			}




		} // UserResponses



	}


	static TodayLearning makeEntity(int userId, int problemId,String type,String category){
		return TodayLearning.builder()
			.userId(userId)
			.problemId(problemId)
			.type(type)
			.correct(false)
			.category(category)
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

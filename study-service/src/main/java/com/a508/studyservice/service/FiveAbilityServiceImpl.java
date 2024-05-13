package com.a508.studyservice.service;

import org.springframework.stereotype.Service;

import com.a508.studyservice.dto.response.FeignUserScoreResponse;
import com.a508.studyservice.entity.FiveAbility;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.repository.FiveAbilityRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FiveAbilityServiceImpl implements  FiveAbilityService{

	private final UserServiceFeignClient userServiceFeignClient;
	private final FiveAbilityRepository fiveAbilityRepository;
	@Override
	public FeignUserScoreResponse getFiveAbility(String token) {
		int userId = 0;
		if( token != null && token.length() >25){ userId = userServiceFeignClient.getUserId(token);}
		log.info(String.valueOf(userId));
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
		return FeignUserScoreResponse.builder()
			.userId(fiveAbility.getUserId())
			.fact(fiveAbility.getFact())
			.inference(fiveAbility.getInference())
			.voca(fiveAbility.getVoca())
			.recognition(fiveAbility.getRecognition())
			.speed(fiveAbility.getSpeed())
			.build();
	}
}

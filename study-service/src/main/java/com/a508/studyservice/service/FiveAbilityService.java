package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.FeignUserScoreResponse;

public interface FiveAbilityService {

	FeignUserScoreResponse getFiveAbility(String token);

	FeignUserScoreResponse getAverageFiveAbility();
}

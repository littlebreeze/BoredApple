package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.FeignUserScoreResponse;
import com.a508.studyservice.entity.FiveAbility;

public interface FiveAbilityService {

	FeignUserScoreResponse getFiveAbility(String token);
}

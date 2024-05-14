package com.a508.userservice.user.service;

import com.a508.userservice.user.data.UserAbilityRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "study-service")
public interface StudyServiceClient {

	@GetMapping("/solve/five")
	public UserAbilityRes GetUserAbility(@RequestHeader("Authorization") String token);

	@GetMapping("/solve/five/average")
	public UserAbilityRes GetAvgAbility();
}
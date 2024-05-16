package com.a508.userservice.user.service;

import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.user.data.CalendarRes;
import com.a508.userservice.user.data.UserAbilityRes;
import com.a508.userservice.user.data.fiveDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@FeignClient(name = "study-service")
public interface StudyServiceClient {

	@GetMapping("/solve/five")
	public fiveDto GetUserAbility(@RequestHeader(value = "Authorization") String token);

	@GetMapping("/solve/five/average")
	public fiveDto GetAvgAbility();

	@GetMapping("/solve/month")
	public CalendarRes GetMonthStudy(@RequestHeader(value = "Authorization") String token, @RequestParam LocalDate date);
}
package com.a508.userservice.user.service;

import com.a508.userservice.user.data.MyBattleRecordRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "game-service")
public interface GameServiceClient {

	@GetMapping("/record")
	public MyBattleRecordRes getMyRecord(@RequestHeader(value = "Authorization") String token);
}

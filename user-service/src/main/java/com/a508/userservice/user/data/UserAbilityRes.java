package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserAbilityRes {

	private int userId;

	private int fact;

	private int inference;

	private int voca;

	private int recognition;

	private int speed;

}

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

	private Integer userId;

	private double fact;

	private double inference;

	private double voca;

	private double recognition;

	private double speed;

}

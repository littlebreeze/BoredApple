package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class AllUserCategoryRes {

	@Setter
	private List<UserCategoryInfo> users;

	@AllArgsConstructor
	@Builder
	@Getter
	public static class UserCategoryInfo {

		private Integer userId;

		private List<String> categories;
	}
}
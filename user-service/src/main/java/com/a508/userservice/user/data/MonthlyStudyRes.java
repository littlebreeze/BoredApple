package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MonthlyStudyRes {

	private String status;

	private MonthStudy data;

	@Getter
	@Builder
	@AllArgsConstructor
	public static class MonthStudy {

		private int totalCnt;

		private double completePercent;

		private String type;

		private String category;
	}
}

package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class DailyStudyRes {
	private List<StudyInfo> DailyStudyList;

	@Getter
	@Builder
	@AllArgsConstructor
	public static class StudyInfo {

		private String problemType;

		private Boolean isCorrect;
	}
}

package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MonthlyStudyRes {

	private int daysCompleteLearning;

	private String mostLearnedStudy;

	private String mostReadCategory;
}

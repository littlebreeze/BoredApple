package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class DateCalendarRes {

	private String status;

	private List<DayStudyCalendar> data;

	@Getter
	@Builder
	@AllArgsConstructor
	public static class DayStudyCalendar {

		private String problemType;

		private boolean correct;
	}
}

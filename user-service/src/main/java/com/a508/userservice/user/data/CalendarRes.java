package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Calendar;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class CalendarRes {

	private String status;

	private MonthCalendar data;

	@Getter
	@Builder
	@AllArgsConstructor
	public static class MonthCalendar {

		private List<DailyCalendarRes> getMonths;

		@Getter
		@Builder
		@AllArgsConstructor
		public static class DailyCalendarRes {

			public int solveCnt;
		}
	}
}

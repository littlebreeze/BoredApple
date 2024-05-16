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

	private DateCalendar data;

	public static class DateCalendar {

		private List<DayStudyCalendar> dayStudyCalendars;

		@Getter
		@Builder
		@AllArgsConstructor
		public static class DayStudyCalendar {

			private String problemType;
			private boolean correct;
		}
	}

}

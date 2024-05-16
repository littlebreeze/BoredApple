package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.util.List;

import com.a508.studyservice.dto.response.DayResponse;
import com.a508.studyservice.dto.response.MonthResponse;
import com.a508.studyservice.dto.response.TodayLearningResponse;
import com.a508.studyservice.dto.response.TotalResponse;

public interface TodayLearningService {


	List<TodayLearningResponse> getTodayLearning (String token);

	List<Integer> getMonths(LocalDateTime dateTime, String token);

	List<DayResponse> getDays (LocalDateTime dateTime , String token);

	TotalResponse getTotal (LocalDateTime dateTime, String token);


}

package com.a508.studyservice.service;

import java.util.List;

import com.a508.studyservice.dto.response.TodayLearningResponse;

public interface TodayLearningService {


	List<TodayLearningResponse> getTodayLearning (String token);
}

package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.util.List;

import com.a508.studyservice.dto.response.ProblemResponse;

public interface IntensiveService {

	List<ProblemResponse> getIntensiveProblems(String token, LocalDateTime dateTime);

	List<ProblemResponse> getTodayIntensive(String token);


}

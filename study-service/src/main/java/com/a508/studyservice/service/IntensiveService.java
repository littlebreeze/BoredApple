package com.a508.studyservice.service;

import java.util.List;

import com.a508.studyservice.dto.request.ProblemRequest;
import com.a508.studyservice.dto.response.ProblemResponse;

public interface IntensiveService {

	List<ProblemResponse> getIntensiveProblems(String token, ProblemRequest problemRequest);

	List<ProblemResponse> getTodayIntensive(String token);


}

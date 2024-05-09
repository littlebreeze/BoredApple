package com.a508.studyservice.service;

import java.util.List;

import com.a508.studyservice.dto.response.EssayResponse;

public interface TopicProblemService {


	List<EssayResponse> getEssayProblem(String token);
}

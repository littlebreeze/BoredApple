package com.a508.studyservice.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.dto.response.SentenceProblemResponse;

public interface SentenceInsertService {

	List<SentenceProblemResponse> getSentenceProblems(String token, LocalDateTime date );
}

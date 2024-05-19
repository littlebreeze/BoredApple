package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.ProblemResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface VocaService {

    List<ProblemResponse> getVocaProblem(String token, LocalDateTime date);
}

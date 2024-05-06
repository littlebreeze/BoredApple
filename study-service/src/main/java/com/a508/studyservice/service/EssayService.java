package com.a508.studyservice.service;

import com.a508.studyservice.dto.request.EssayRequest;
import com.a508.studyservice.dto.response.EssayResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface EssayService {




	List<EssayResponse>  getProblemList(String token , LocalDateTime date);


	List<EssayResponse> postEssayProblem(String token , EssayRequest request);



}

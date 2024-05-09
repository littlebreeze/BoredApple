package com.a508.studyservice.service;


import com.a508.studyservice.dto.request.ChoiceRequest;
import com.a508.studyservice.dto.response.ChoiceSolvedResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ChoiceSolvedService {


    List<ChoiceSolvedResponse> postChoice(String token, ChoiceRequest choiceRequest);

}
package com.a508.studyservice.service;


import com.a508.studyservice.dto.response.ChoiceSolvedResponse;

import java.util.List;

public interface ChoiceSolvedService {


    List<ChoiceSolvedResponse>  getTodayChoice(String token );  // 오늘 거;

    List<ChoiceSolvedResponse>  getSpecificChoice(String token ); // 특정 날짜 조회


}
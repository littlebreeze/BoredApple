package com.a508.studyservice.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeignUserScoreResponse {

    private double userId;
    private double fact;
    private double inference;
    private double voca;
    private double recognition;
    private double speed;
}


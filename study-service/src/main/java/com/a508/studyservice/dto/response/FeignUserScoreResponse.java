package com.a508.studyservice.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeignUserScoreResponse {

    private int fact;
    private int inference;
    private int voca;
    private int recognition;
    private int speed;
}


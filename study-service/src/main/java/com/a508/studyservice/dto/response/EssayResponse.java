package com.a508.studyservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EssayResponse {


    private String content;

    private String userAnswer;

    private String answer;

    //어떤 유형 문제인지
    private String type;

    private Integer problemId;

    private Integer similarity;



}

package com.a508.studyservice.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EssayResponse {

    private String title;

    private String question;

    private String text;

    private Integer userAnswer;

    private Integer answer;

    //어떤 유형 문제인지
    private String category;

    private Integer problemId;

    private Integer similarity;

    private LocalDateTime createdAt;


}

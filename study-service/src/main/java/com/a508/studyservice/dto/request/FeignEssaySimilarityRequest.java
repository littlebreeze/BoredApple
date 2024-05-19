package com.a508.studyservice.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeignEssaySimilarityRequest {
    String myAnswer;
    String answer;
}

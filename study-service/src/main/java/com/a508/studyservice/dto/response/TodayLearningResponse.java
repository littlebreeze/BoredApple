package com.a508.studyservice.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodayLearningResponse {

    private String type;

    private String category;

    private boolean solved;

    private Integer difficulty;


}

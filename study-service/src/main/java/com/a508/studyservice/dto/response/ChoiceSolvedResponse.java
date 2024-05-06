package com.a508.studyservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChoiceSolvedResponse {

    private Integer userAnswer;

    private Integer answer;

    //어떤 유형 문제인지
    private String type;

    private Integer problemId;

    private boolean correct;

    private LocalDateTime createdAt;
}

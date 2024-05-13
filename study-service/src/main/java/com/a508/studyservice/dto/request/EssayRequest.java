package com.a508.studyservice.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class EssayRequest {
    String type;

    List<String> myAnswer;

    List<Integer> problemId;

    Integer spendTime;
}

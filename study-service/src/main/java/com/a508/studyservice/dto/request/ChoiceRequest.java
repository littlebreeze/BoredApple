package com.a508.studyservice.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ChoiceRequest {
    String type;

    List<Integer> myAnswer;

    List<Integer> problemId;

    Integer spendTime;

}

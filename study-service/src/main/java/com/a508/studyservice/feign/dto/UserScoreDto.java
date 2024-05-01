package com.a508.studyservice.feign.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserScoreDto {

    private int fact;
    private int inference;
    private int voca;
    private int recognition;
    private int speed;
}


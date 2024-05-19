package com.a508.studyservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyTimeFeignResponse {

    String userId;
    LocalTime studyTime;
}

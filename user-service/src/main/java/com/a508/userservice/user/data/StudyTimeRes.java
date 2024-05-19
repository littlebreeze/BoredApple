package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyTimeRes {

    Integer userId;
    LocalTime studyTime;

}

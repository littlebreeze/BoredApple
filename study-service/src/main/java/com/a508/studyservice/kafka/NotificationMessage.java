package com.a508.studyservice.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationMessage {
    private String userId;
    private LocalTime studyTime;
    private String message;
}

package com.a508.studyservice.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Slf4j
public class NotificationConsumer {
    private final NotificationService notificationService;

    public NotificationConsumer(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @KafkaListener(topics = "study-time-topic", groupId = "study-group")
    public void consumeNotification(NotificationMessage message) {
        notificationService.scheduleNotification(message);
    }
}


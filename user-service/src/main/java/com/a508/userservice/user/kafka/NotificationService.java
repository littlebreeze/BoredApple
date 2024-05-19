package com.a508.userservice.user.kafka;


import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class NotificationService {

    private final KafkaTemplate<String, NotificationMessage> kafkaTemplate;

    @Autowired
    public NotificationService(KafkaTemplate<String, NotificationMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendNotification(String topic, NotificationMessage message) {
        kafkaTemplate.send(topic, message);
    }
}
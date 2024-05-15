package com.a508.studyservice.kafka;

import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class StudyAlarmService {
    private final KafkaConsumer<String, String> consumer;
    private final SseEmitter emitter;
    private final Map<Integer, LocalTime> studyTimeMap = new ConcurrentHashMap<Integer, LocalTime>();

    public StudyAlarmService(KafkaConsumer<String, String> consumer, SseEmitter emitter) {
        this.consumer = consumer;
        this.emitter = emitter;
    }
    public SseEmitter getStudyAlarmEmitter() {
        return emitter;
    }
    @PostConstruct
    public void consumeUserEvents() {
        new Thread(() -> {
            consumer.subscribe(Collections.singletonList("user-events"));
            while (true) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
                for (ConsumerRecord<String, String> record : records) {
                    Gson gson = new Gson();
                    UserEvent event = gson.fromJson(record.value(), UserEvent.class);
                    handleUserEvent(event);
                }
            }
        }).start();
    }

    private void handleUserEvent(UserEvent event) {
        studyTimeMap.put(event.getUserId(), event.getStudyTime());
        scheduleAlarm(event.getUserId(), event.getStudyTime());
    }

    private void scheduleAlarm(Integer userId, LocalTime studyTime) {
        // 현재 시간과 스터디 시간 차이 계산
        LocalTime currentTime = LocalTime.now();
        LocalTime alarmTime = studyTime;
        Duration duration = Duration.between(currentTime, alarmTime);

        if (duration.isNegative()) {
            alarmTime = alarmTime.plusMinutes(1440);
            duration = Duration.between(currentTime, alarmTime);
        }

        // 스터디 시간에 맞춰 알림 전송 예약
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.schedule(() -> sendAlarm(userId), duration.toMillis(), TimeUnit.MILLISECONDS);
    }

    private void sendAlarm(int userId) {
        LocalTime studyTime = studyTimeMap.get(userId);
        String alarmMessage = String.format("userId: %d, studyTime: %s", userId, studyTime);
        try {
            emitter.send(SseEmitter.event().data(alarmMessage));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
package com.a508.studyservice.kafka;

import com.a508.studyservice.dto.response.StudyTimeFeignResponse;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.repository.TodayLearningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Map<String, NotificationMessage> notifications = new ConcurrentHashMap<>();
    private final TodayLearningRepository todayLearningRepository;
    private final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;


    public void init2() {
        log.info(notifications.get("8").toString());
    }

    public void init(List<StudyTimeFeignResponse> input) {
        for (StudyTimeFeignResponse response : input) {
            notifications.put(response.getUserId(), new NotificationMessage(response.getUserId(), response.getStudyTime(), " "));
        }
    }

    public SseEmitter subscribe(String userId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitters.put(userId, emitter);
        log.info(emitter.toString());

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        emitter.onError(e -> emitters.remove(userId));

        return emitter;
    }

    public void scheduleNotification(NotificationMessage message) {
        String userId = message.getUserId();
        LocalTime notificationTime = message.getStudyTime();
        String notificationText = message.getMessage();
        log.info("값이 들어온 message : " + message);
        notifications.put(userId, message);
        log.info(notifications.toString());

    }


    @Scheduled(fixedDelay = 60000) // 1분마다 실행
    public void checkNotifications() {
        LocalTime currentTime = LocalTime.now();
        int currentHour = currentTime.getHour();
        int currentMinute = currentTime.getMinute();
        log.info(notifications.values().toString());
        for (NotificationMessage message : notifications.values()) {
            LocalTime studyTime = message.getStudyTime();
            if (studyTime != null && studyTime.getHour() == currentHour && studyTime.getMinute() == currentMinute) {
                sendNotification(message);
            }
        }
    }

    @Async
    private void sendNotification(NotificationMessage message) {
        String userId = message.getUserId();
        SseEmitter emitter = emitters.get(userId);
        log.info(emitter.toString());
        LocalDateTime date = LocalDateTime.now();
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(Integer.parseInt(userId),startDate,endDate);
        String alarm = "";
        int cnt = 0 ;
        for(TodayLearning todayLearning :todayLearnings) {if(todayLearning.isCorrect()) cnt++;}

        if( cnt == 9 ) alarm = " 아주 훌륭하게 오늘의 학습을 끝내셨네요!!";
        if( cnt == 6 ) alarm = " 조금만 더 힘내서 학습을 마무리 해봐요!!";
        if( cnt == 3 ) alarm = " 아직 학습이 많이 남았어요!! ";
        if( cnt == 0 ) alarm = " 오늘의 학습을 시작해 봐요!! ";

        log.info(alarm);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(alarm));
                log.info("Sent notification: " + message.getMessage());
            } catch (IOException e) {
                emitters.remove(userId);
                log.error("Failed to send notification to user " + userId, e);
            }
        }
    }
}


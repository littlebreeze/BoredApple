package com.a508.gameservice.game.service;

import com.a508.gameservice.game.data.ChatMessageRes;
import com.a508.gameservice.game.data.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SchedulerService {

    private SimpMessagingTemplate simpMessagingTemplate;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Autowired
    public void setMessagingTemplate(SimpMessagingTemplate messagingTemplate) {
        this.simpMessagingTemplate = messagingTemplate;
    }

    private int roomId;
    private int timeCnt = 33;
    private ScheduledFuture<?> scheduledTask;

    public SchedulerService(SimpMessagingTemplate simpMessagingTemplate, int roomId) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.roomId = roomId;
    }

    public void startTask() {
        timeCnt = 33;
        // 이전에 실행된 작업이 있다면 중지
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
        }
        // 스케줄링 작업 시작
        scheduledTask = scheduler.scheduleAtFixedRate(() -> {
            if (timeCnt == 30) {
                ChatMessageRes chatMessageRes = ChatMessageRes.builder().type(MessageType.QUIZ).content("문제").build();
                simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, chatMessageRes);
            }
            simpMessagingTemplate.convertAndSend("/topic/time/rooms/" + roomId, "{\"time\":" + timeCnt + "}");
            timeCnt--;
            if (timeCnt == 0) stopTask();
        }, 0, 1, TimeUnit.SECONDS);
    }

    public void stopTask() {
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
        }
    }
}
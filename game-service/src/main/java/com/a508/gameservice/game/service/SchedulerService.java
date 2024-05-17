package com.a508.gameservice.game.service;

import com.a508.gameservice.game.data.ChatMessageRes;
import com.a508.gameservice.game.data.MessageType;
import com.a508.gameservice.game.domain.GameQuiz;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SchedulerService {

    private SimpMessagingTemplate simpMessagingTemplate;
    private GameQuizService gameQuizService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private int quizCount;
    private List<GameQuiz> gameQuizList;

    @Autowired
    public void setMessagingTemplate(SimpMessagingTemplate messagingTemplate) {
        this.simpMessagingTemplate = messagingTemplate;
    }

    private int roomId;
    private int timeCnt = 43;
    private int roundCnt = 0;
    private ScheduledFuture<?> scheduledTask;

    public SchedulerService(GameQuizService gameQuizService, SimpMessagingTemplate simpMessagingTemplate, int roomId, int quizCount) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.gameQuizService = gameQuizService;
        this.roomId = roomId;
        this.quizCount = quizCount;
    }

    public void startRound() {
        timeCnt = 43;
        // 이전에 실행된 작업이 있다면 중지
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
        }
        //문제 가져오기
        GameQuiz gameQuiz = gameQuizList.get(roundCnt);
        // 스케줄링 작업 시작
        scheduledTask = scheduler.scheduleAtFixedRate(() -> {
            if (timeCnt >= 0) simpMessagingTemplate.convertAndSend("/topic/time/rooms/" + roomId, timeCnt);
            if (timeCnt == 40) {
                ChatMessageRes quiz = ChatMessageRes.builder().type(MessageType.QUIZ).content(gameQuiz.getQuiz()).build();
                simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, quiz);
                String encodingAnswer = Base64.getEncoder().encodeToString(gameQuiz.getAnswer().getBytes());
                ChatMessageRes answer = ChatMessageRes.builder().type(MessageType.ANSWER).content(encodingAnswer).build();
                simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, answer);
            }
            timeCnt--;
            if (timeCnt <= -1) stopTask();
        }, 0, 1, TimeUnit.SECONDS);
        roundCnt++;
    }

    public void stopTask() {
        if (scheduledTask != null && !scheduledTask.isCancelled()) {
            scheduledTask.cancel(true);
        }
    }

    public void getQuizList() {
        gameQuizList = gameQuizService.getQuiz(quizCount);
        roundCnt = 0;
    }

}
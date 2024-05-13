package com.a508.gameservice.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GameSchedulerManageService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final GameQuizService gameQuizService;
    private final Map<Integer, SchedulerService> gameSchedulerMap = new HashMap<>();

    // 방의 GameScheduler를 생성
    public void addRoom(int roomId, int quizCount) {
        SchedulerService gameScheduler = new SchedulerService(gameQuizService, simpMessagingTemplate, roomId, quizCount);
        gameSchedulerMap.put(roomId, gameScheduler);
        gameScheduler.getQuizList();
    }

    // 방을 제거
    public void removeRoom(int roomId) {
        gameSchedulerMap.remove(roomId);
    }

    // 방 번호에 해당하는 GameScheduler를 반환
    public SchedulerService getGameScheduler(int roomId) {
        return gameSchedulerMap.get(roomId);
    }
}

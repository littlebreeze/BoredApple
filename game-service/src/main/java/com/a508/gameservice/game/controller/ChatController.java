package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.game.service.GameSchedulerManageService;
import com.a508.gameservice.game.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final GameSchedulerManageService gameSchedulerManageService;
    private final GameRoomService gameRoomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    /**
     *  채팅방 구독 & 발행
     */
    @MessageMapping("/ws/rooms/{roomId}/send")
    @SendTo("/topic/chat/rooms/{roomId}")
    public ChatMessageRes sendMessage(@DestinationVariable Integer roomId, @Payload ChatMessageReq chatMessage) {
        String content = chatMessage.getMessage();
        String writer = "심심한 사과";
        if (chatMessage.getType() == MessageType.ENTER) {
            content = chatMessage.getSender();
        } else if (chatMessage.getType() == MessageType.TALK) {
            writer = chatMessage.getSender();
        } else if (chatMessage.getType() == MessageType.CORRECT) {
            content = chatMessage.getSender() + "님이 정답을 맞히셨습니다.";
            SchedulerService service = gameSchedulerManageService.getGameScheduler(roomId);
            service.stopTask();
        } else if (chatMessage.getType() == MessageType.EXIT) {
            content = chatMessage.getSender() + "님이 퇴장하셨습니다.";
            //퇴장하기
            gameRoomService.removeRoomPlayer(roomId,chatMessage.getSenderId());
        }

        return ChatMessageRes.builder()
                .type(chatMessage.getType())
                .content(content)
                .writer(writer)
                .target(chatMessage.getSenderId())
                .build();
    }

    /**
     * 게임방 진행 상태 구독
     */
    @MessageMapping("/ws/quiz/rooms/{roomId}/send")
    public void sendQuiz(@DestinationVariable Integer roomId, @Payload QuizMessageReq quizMessageReq) {
        String message = quizMessageReq.getMessage();
        if (message.equals("START")) {
            //방정보 게임 중
            gameRoomService.updateIsStarted(roomId,true);
            ChatMessageRes start = ChatMessageRes.builder().type(MessageType.START).content("START").build();
            simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, start);
        } else if (message.equals("ROUND")) {
            SchedulerService service = gameSchedulerManageService.getGameScheduler(roomId);
            service.startRound();
        } else if (message.equals("END")) {
            //방정보 게임 중 X
            ChatMessageRes end = ChatMessageRes.builder().type(MessageType.END).content("END").build();
            simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, end);
            gameRoomService.updateIsStarted(roomId,false);
            SchedulerService service = gameSchedulerManageService.getGameScheduler(roomId);
            service.getQuizList();
        }
    }

    /**
     * 게임결과 구독 & 발행
     */
    @MessageMapping("/ws/result/rooms/{roomId}/send")
    @SendTo("/topic/result/rooms/{roomId}")
    public ResultListRes sendResult(@DestinationVariable Integer roomId, @Payload ResultListReq resultListReq) {
       return ResultListRes.builder()
               .resultResList(gameRoomService.getResult(resultListReq)).build();
    }

}

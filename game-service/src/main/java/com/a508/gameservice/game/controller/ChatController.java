package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.ChatMessageReq;
import com.a508.gameservice.game.data.ChatMessageRes;
import com.a508.gameservice.game.data.MessageType;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.game.service.SchedulerService;
import com.a508.gameservice.game.service.GameSchedulerManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final GameSchedulerManageService gameSchedulerManageService;
    private final GameRoomService gameRoomService;

    @MessageMapping("/ws/rooms/{roomId}/send")
    @SendTo("/topic/chat/rooms/{roomId}")
    public ChatMessageRes sendMessage(@DestinationVariable Integer roomId, @Payload ChatMessageReq chatMessage) {
        String content = chatMessage.getMessage();
        String writer = "심심한 사과";
        if (chatMessage.getType() == MessageType.ENTER) {
            content = chatMessage.getSender() + "님이 입장하셨습니다.";
        } else if (chatMessage.getType() == MessageType.TALK) {
            writer = chatMessage.getSender();
        } else if (chatMessage.getType() == MessageType.CORRECT) {
            content = chatMessage.getSender() + "님이 정답을 맞히셨습니다.";
            SchedulerService service=gameSchedulerManageService.getGameScheduler(roomId);
            service.stopTask();
        } else if (chatMessage.getType() == MessageType.EXIT) {
            content = chatMessage.getSender() + "님이 퇴장하셨습니다.";
        }

        return ChatMessageRes.builder()
                .type(chatMessage.getType())
                .content(content)
                .writer(writer)
                .target(chatMessage.getSenderId())
                .build();
    }

    @MessageMapping("/ws/quiz/rooms/{roomId}/send")
    public void sendQuiz(@DestinationVariable Integer roomId, @Payload String message) {
        if (message.equals("START")) {
           //방정보 게임 중
            gameRoomService.updateIsStarted(roomId);
        }else if(message.equals("ROUND")){
            SchedulerService service=gameSchedulerManageService.getGameScheduler(roomId);
            service.startTask();
        }else if (message.equals("END")){
            //방정보 게임 중 X
            gameRoomService.updateIsStarted(roomId);
        }
    }

}

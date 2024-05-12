package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.ChatMessageReq;
import com.a508.gameservice.game.data.ChatMessageRes;
import com.a508.gameservice.game.data.MessageType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

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

}

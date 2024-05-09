package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.ChatMessageReq;
import com.a508.gameservice.game.data.ChatMessageRes;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat/rooms/{roomId}/send")
    @SendTo("/topic/public/rooms/{roomId}")
    public ChatMessageRes sendMessage(@DestinationVariable Integer roomId, @Payload ChatMessageReq chatMessage) {
        if(chatMessage.getType()== ChatMessageReq.MessageType.ENTER){
            
        } else if (chatMessage.getType()== ChatMessageReq.MessageType.TALK) {
            
        }
        ChatMessageRes chatMessageRes = ChatMessageRes.builder()
                .content(chatMessage.getMessage())
                .writer(chatMessage.getSender())
                .build();
        return chatMessageRes;
    }
}

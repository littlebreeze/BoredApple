package com.a508.gameservice.game.data;

import lombok.Getter;

@Getter
public class ChatMessageReq {

    public enum MessageType {
        CORRECT,ENTER,EXIT,TALK
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;


}

package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageReq {

    private MessageType type;
    private String roomId;
    private String sender;
    private Integer senderId;
    private String message;


}

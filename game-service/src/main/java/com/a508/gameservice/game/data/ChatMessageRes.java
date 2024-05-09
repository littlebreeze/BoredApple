package com.a508.gameservice.game.data;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatMessageRes {

    private String content;
    private String writer;

}

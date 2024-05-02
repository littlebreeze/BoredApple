package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class GameRoomReq {

    private String id;
    private String roomName;
    private Boolean isSecret; //entity에 없는 것
    private String roomPassword;
    private Integer maxNum;
    private Integer quizCount;
}

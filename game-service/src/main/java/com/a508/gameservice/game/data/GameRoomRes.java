package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRoomRes {

    private String id;
    private String roomName;
    private Boolean isSecret; //entity에 없는 것
    private String roomPassword;
    private Integer nowNum; //entity에 없는 것
    private Integer maxNum;
    private Boolean isStarted;
    private String roomCreatorName;
    private Integer quizCount;
}

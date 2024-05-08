package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewRoomRes {

    private String myNickname;
    private Integer myUserId;
    private Integer roomId;
    private Integer maxNum;
    private Integer quizCount;
    private Integer creatorId;

}

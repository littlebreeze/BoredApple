package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinRoomRes {

    private String myNickname;
    private Integer myUserId;
    private Integer roomId;
    private String roomName;
    private Integer maxNum;
    private Integer quizCount;
    private Integer creatorId;
    private List<RoomPlayerRes> roomPlayerRes;
}

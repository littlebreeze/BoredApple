package com.a508.gameservice.game.data;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Builder
@Getter
public class GameRoomListRes {

    private List<GameRoomRes> gameRoomResList;
    private Boolean isEndPage;
}

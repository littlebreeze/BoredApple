package com.a508.gameservice.game.data;

import com.a508.gameservice.game.domain.GameRoom;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PageRoomListDTO {

    private List<GameRoom> gameRoomList;
    private Boolean isEndPage;
}

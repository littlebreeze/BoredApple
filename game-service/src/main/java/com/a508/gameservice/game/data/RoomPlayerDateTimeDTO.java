package com.a508.gameservice.game.data;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
@Builder
@Getter
public class RoomPlayerDateTimeDTO {

    private int userId;
    private LocalDateTime joinGameTime;

}

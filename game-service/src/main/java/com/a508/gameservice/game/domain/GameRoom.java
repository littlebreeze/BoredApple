package com.a508.gameservice.game.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash(value = "gameRoom", timeToLive = 60 * 60 * 24 * 7)
public class GameRoom {

    @Id
    private String id;

    private String roomName;

    private String roomPassword;

    private Integer roomCreatorId;

    private Boolean isStarted;

    private Integer maxNum;

    private Integer quizCount;

    private Boolean isSecret;

    private LocalDateTime createdTime;

    public void setIsStarted(boolean isStarted) {
        this.isStarted = isStarted;
    }

    public void setRoomCreatorId(int userId){
        this.roomCreatorId=userId;
    }
}

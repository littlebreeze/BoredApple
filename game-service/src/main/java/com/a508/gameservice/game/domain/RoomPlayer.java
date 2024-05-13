package com.a508.gameservice.game.domain;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash(value = "roomPlayer", timeToLive = 60 * 60 * 24 * 7)
public class RoomPlayer {

    @Id
    private Integer userId;

//    private LocalDateTime joinGameTime;
}

package com.a508.gameservice.game.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RoomPlayerRepository {
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String ROOM_PLAYER_HASH_KEY = "roomPlayer:";

    public RoomPlayerRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void addPlayerToRoom(String roomId, Integer userId) {
        String key = ROOM_PLAYER_HASH_KEY + roomId;
        redisTemplate.opsForHash().put(key, userId.toString(), userId);
    }

    public Long playerCnt(String roomId) {
        String key = ROOM_PLAYER_HASH_KEY + roomId;
        return redisTemplate.opsForHash().size(key);
    }

}

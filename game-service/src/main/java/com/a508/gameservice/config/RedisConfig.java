package com.a508.gameservice.config;

import com.a508.gameservice.game.domain.GameRoom;
import com.a508.gameservice.game.domain.RoomPlayer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.port}")
    private int port;
    @Value("${spring.data.redis.host}")
    private String host;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisTemplate<String, GameRoom> redisGameRoomTemplate() {
        RedisTemplate<String, GameRoom> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        // 모든 경우
        redisTemplate.setDefaultSerializer(new Jackson2JsonRedisSerializer<>(GameRoom.class));
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, RoomPlayer> redisRoomPlayerTemplate() {
        RedisTemplate<String, RoomPlayer> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        // 모든 경우
        redisTemplate.setDefaultSerializer(new Jackson2JsonRedisSerializer<>(RoomPlayer.class));
        return redisTemplate;
    }


}

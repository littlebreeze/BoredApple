package com.a508.gameservice.game.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class GameRoomTemplateRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    public GameRoomTemplateRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    //정규식 패턴 검증을 통한 id 반환
    public Set<Integer> getAllIds() {
        TreeSet<Integer> ids = new TreeSet<>();
        Set<String> keys = redisTemplate.keys("gameRoom:*");
        if (keys!=null&& !keys.isEmpty()) {
            Pattern pattern = Pattern.compile("gameRoom:(\\d+)");
            for (String key : keys) {
                Matcher matcher = pattern.matcher(key);
                if (matcher.find()) {
                    String idStr = matcher.group(1);
                    int id = Integer.parseInt(idStr);
                    ids.add(id);
                }
            }
        }
        return ids;
    }

}

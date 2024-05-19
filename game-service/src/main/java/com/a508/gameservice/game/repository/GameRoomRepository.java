package com.a508.gameservice.game.repository;

import com.a508.gameservice.exception.CustomException;
import com.a508.gameservice.exception.ErrorCode;
import com.a508.gameservice.game.data.PageRoomListDTO;
import com.a508.gameservice.game.domain.GameRoom;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class GameRoomRepository {
    private final RedisTemplate<String, GameRoom> redisTemplate;
    private final RoomPlayerRepository roomPlayerRepository;
    private static final String GAME_ROOM_HASH_KEY = "gameRoom:";

    public GameRoomRepository(RedisTemplate<String, GameRoom> redisGameRoomTemplate, RoomPlayerRepository roomPlayerRepository) {
        this.redisTemplate = redisGameRoomTemplate;
        this.roomPlayerRepository = roomPlayerRepository;
    }

    public void saveGameRoom(GameRoom gameRoom) {
        redisTemplate.opsForValue().set(GAME_ROOM_HASH_KEY + gameRoom.getId(), gameRoom);
    }

    public GameRoom getGameRoom(String id) {
        return redisTemplate.opsForValue().get(GAME_ROOM_HASH_KEY + id);
    }

    //정규식 패턴 검증을 통한 id 반환
    public Set<Integer> getAllIds() {
        Set<Integer> ids = new TreeSet<>();
        Set<String> keys = redisTemplate.keys(GAME_ROOM_HASH_KEY + "*");
        if (keys != null && !keys.isEmpty()) {
            Pattern pattern = Pattern.compile(GAME_ROOM_HASH_KEY + "(\\d+)");
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

    public PageRoomListDTO getGameRoomsByPage(int pageNum) {
        return getGameRoomsByPage(pageNum, 6);
    }

    public PageRoomListDTO getGameRoomsByPage(int pageNum, int pageSize) {
        int start = (pageNum - 1) * pageSize;
        int end = start + pageSize - 1;
        Boolean isEndPage = false;
        Set<Integer> ids = getAllIds();

        List<GameRoom> gameRooms = new ArrayList<>();
        int i = 0;
        for (Integer id : ids) {
            if (i >= start && i <= end) {
                GameRoom gameRoom = getGameRoom(String.valueOf(id));
                if (gameRoom != null) {
                    gameRooms.add(gameRoom);
                } else {
                    isEndPage = true;
                    break;
                }
            }
            i++;
        }

        if (ids.size() <= end + 1) isEndPage = true;
        return PageRoomListDTO.builder()
                .gameRoomList(gameRooms)
                .isEndPage(isEndPage)
                .build();
    }

    public void updateIsStarted(String roomId, boolean isStarted) {
        GameRoom gameRoom = getGameRoom(roomId);
        if (gameRoom != null) {
            gameRoom.setIsStarted(isStarted);
            redisTemplate.opsForValue().set(GAME_ROOM_HASH_KEY + roomId, gameRoom);
        } else {
            throw new CustomException(ErrorCode.ROOM_IS_NOT_EXIST);
        }
    }

    public void removeGameRoom(String roomId) {
        redisTemplate.delete(GAME_ROOM_HASH_KEY + roomId);
    }


    public List<GameRoom> findQuickEntryGameRoom() {
        Set<String> keys = redisTemplate.keys(GAME_ROOM_HASH_KEY + "*");
        if (keys == null) throw new CustomException(ErrorCode.GAME_ROOM_IS_EMPTY);
        List<GameRoom> gameRooms = new ArrayList<>();
        for (String key : keys) {
            GameRoom gameRoom = redisTemplate.opsForValue().get(key);
            if (gameRoom != null && !gameRoom.getIsSecret() && !gameRoom.getIsStarted() && roomPlayerRepository.playerCnt(String.valueOf(gameRoom.getId())) < gameRoom.getMaxNum()) {
                gameRooms.add(gameRoom);
            }
        }
        return gameRooms;
    }
}

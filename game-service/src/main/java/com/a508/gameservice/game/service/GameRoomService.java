package com.a508.gameservice.game.service;

import com.a508.gameservice.game.data.GameRoomReq;
import com.a508.gameservice.game.data.GameRoomRes;
import com.a508.gameservice.game.domain.GameRoom;
import com.a508.gameservice.game.repository.GameRoomRepository;
import com.a508.gameservice.game.repository.GameRoomTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRoomRepository gameRoomRepository;
    private final GameRoomTemplateRepository gameRoomTemplateRepository;

    public List<GameRoomRes> getRooms(int pageNum) {
        Pageable pageable = PageRequest.of(pageNum - 1, 2, Sort.by("id").ascending());
        Page<GameRoom> gameRoomList = gameRoomRepository.findAll(pageable);
        Boolean isEndPage = false;
        if (pageNum == gameRoomList.getTotalPages()) isEndPage = true;
        List<GameRoomRes> gameRoomResList = new ArrayList<>();
        for (GameRoom gameRoom : gameRoomList.getContent()) {
            GameRoomRes gameRoomRes = GameRoomRes.builder()
                    .id(gameRoom.getId())
                    .roomName(gameRoom.getRoomName())
                    .isSecret(gameRoom.getIsSecret())
                    .roomPassword(gameRoom.getRoomPassword())
//                    .roomCreatorId()
                    .maxNum(gameRoom.getMaxNum())
                    .quizCount(gameRoom.getQuizCount())
                    .isStarted(gameRoom.getIsStarted())
                    .isEndPage(isEndPage)
                    .build();
            gameRoomResList.add(gameRoomRes);
        }

        return gameRoomResList;
    }


    public synchronized void createRoom(GameRoomReq gameRoomReq) {
        GameRoom gameRoom = GameRoom.builder()
                .id(String.valueOf(getMinRoomId()))//id 가장 작은 값으로 배정 로직 만들기
                .roomName(gameRoomReq.getRoomName())
                .roomPassword(gameRoomReq.getRoomPassword())
//                .roomCreatorId(gameRoomReq.getRoomCreatorId()) user-service에 요청보내기
                .quizCount(gameRoomReq.getQuizCount())
                .isSecret(gameRoomReq.getIsSecret())
                .maxNum(gameRoomReq.getMaxNum()).build();
        gameRoomRepository.save(gameRoom);
    }


    public Integer getMinRoomId() {
        Set<Integer> idList = gameRoomTemplateRepository.getAllIds();
        int num = 1;
        while (true) {
            if (!idList.contains(num)) return num;
            num += 1;
        }
    }
}

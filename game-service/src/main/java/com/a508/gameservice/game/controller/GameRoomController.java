package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.game.service.GameSchedulerManageService;
import com.a508.gameservice.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class GameRoomController {

    private final GameRoomService gameRoomService;
    private final GameSchedulerManageService gameSchedulerManageService;

    /**
     * 방 목록 (페이지)
     */
    @GetMapping("/rooms/{pageNum}")
    public SuccessResponse<GameRoomListRes> getRooms(@PathVariable int pageNum) {
        return new SuccessResponse<>(gameRoomService.getRooms(pageNum));
    }

    /**
     * 방 생성하기
     */
    @PostMapping("/rooms")
    public SuccessResponse<JoinRoomRes> addRoom(HttpServletRequest request, @RequestBody GameRoomReq gameRoomReq) {
        JoinRoomRes joinRoomRes = gameRoomService.createRoom(request, gameRoomReq);
        gameSchedulerManageService.addRoom(joinRoomRes.getRoomId(), joinRoomRes.getQuizCount());
        return new SuccessResponse<>(joinRoomRes);
    }

    /**
     * 방 입장하기
     */
    @GetMapping("/players")
    public SuccessResponse<JoinRoomRes> addPlayer(HttpServletRequest request, @RequestParam Integer roomId) {
        gameRoomService.createRoomPlayer(request, roomId);
        return new SuccessResponse<>(gameRoomService.getRoomInfo(request, roomId));
    }

    /**
     * 게임 랭킹 목록
     */
    @GetMapping("/rankings")
    public SuccessResponse<RankingRes> getRankings(HttpServletRequest request) {
        return new SuccessResponse<>(gameRoomService.getRankings(request));
    }

    /**
     * 마이페이지 전적조회
     */
    @GetMapping("/record")
    public MyBattleRecordRes getMyRecord(@RequestHeader(value = "Authorization") String token) {
        return gameRoomService.getMyRecord(token);
    }


}

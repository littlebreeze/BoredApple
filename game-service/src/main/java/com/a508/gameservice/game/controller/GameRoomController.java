package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @GetMapping("/rooms/{pageNum}")
    public SuccessResponse<List<GameRoomRes>> getRooms(@PathVariable int pageNum) {
        return new SuccessResponse<>(gameRoomService.getRooms(pageNum));
    }

    @PostMapping("/rooms")
    public SuccessResponse<NewRoomRes> addRoom(HttpServletRequest request, @RequestBody GameRoomReq gameRoomReq) {
        return new SuccessResponse<>(gameRoomService.createRoom(request, gameRoomReq));
    }

    @GetMapping("/players")
    public SuccessResponse<JoinRoomRes> addPlayer(HttpServletRequest request, @RequestParam Integer roomId) {
        gameRoomService.createRoomPlayer(request, roomId);
        return new SuccessResponse<>(gameRoomService.getRoomInfo(request, roomId));
    }


    @GetMapping("/rankings")
    public SuccessResponse<RankingRes> getRankings(HttpServletRequest request) {
        return new SuccessResponse<>(gameRoomService.getRankings(request));
    }
}

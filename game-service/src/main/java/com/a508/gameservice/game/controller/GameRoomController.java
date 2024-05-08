package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.GameRoomReq;
import com.a508.gameservice.game.data.GameRoomRes;
import com.a508.gameservice.game.data.RankingRes;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RequiredArgsConstructor
@RestController
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @GetMapping("/rooms/{pageNum}")
    public SuccessResponse<List<GameRoomRes>> getRooms(@PathVariable int pageNum) {
        return new SuccessResponse<>(gameRoomService.getRooms(pageNum));
    }

    @PostMapping("/rooms")
    public SuccessResponse<Map<String, Integer>> addRoom(HttpServletRequest request, @RequestBody GameRoomReq gameRoomReq) {
        Map<String, Integer> data = new TreeMap<>();
        data.put("roomId", gameRoomService.createRoom(request, gameRoomReq));
        return new SuccessResponse<>(data);
    }

    @PostMapping("/players")
    public SuccessResponse<Integer> addPlayer(HttpServletRequest request, @RequestBody Integer roomId) {
        gameRoomService.createRoomPlayer(request, roomId);
        return new SuccessResponse<>(HttpStatus.SC_CREATED);
    }


    @GetMapping("/rankings")
    public SuccessResponse<RankingRes> getRankings(HttpServletRequest request) {
        return new SuccessResponse<>(gameRoomService.getRankings(request));
    }
}

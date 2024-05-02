package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.GameRoomReq;
import com.a508.gameservice.game.data.GameRoomRes;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @GetMapping("/rooms/{pageNum}")
    public SuccessResponse<List<GameRoomRes>> getRooms(HttpServletRequest request, @PathVariable int pageNum) {
        return new SuccessResponse<>(gameRoomService.getRooms(pageNum));
    }

    @PostMapping("/room")
    public SuccessResponse<Integer> addRoom(HttpServletRequest request, @RequestBody GameRoomReq gameRoomReq) {
        gameRoomService.createRoom(gameRoomReq);
        return new SuccessResponse<>(HttpStatus.SC_CREATED);
    }

}

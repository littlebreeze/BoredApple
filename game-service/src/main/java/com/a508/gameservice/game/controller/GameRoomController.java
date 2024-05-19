package com.a508.gameservice.game.controller;

import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.service.GameRoomService;
import com.a508.gameservice.game.service.GameSchedulerManageService;
import com.a508.gameservice.response.SuccessResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class GameRoomController {

    private final GameRoomService gameRoomService;
    private final GameSchedulerManageService gameSchedulerManageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

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
        gameRoomService.createRoomPlayer(request, roomId,true);
        return new SuccessResponse<>(gameRoomService.getRoomInfo(request, roomId));
    }

    /**
     * 빠른 입장
     */
    @GetMapping("/quick-entry")
    public SuccessResponse<JoinRoomRes> quickEntryPlayer(HttpServletRequest request){
        int roomId=gameRoomService.quickEntryPlayer(request);
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
     * 마이페이지 전적조회 feign
     */
    @GetMapping("/record")
    public MyBattleRecordRes getMyRecord(@RequestHeader(value = "Authorization") String token) {
        return gameRoomService.getMyRecord(token);
    }


    /**
     * 방 퇴장
     */
    @PostMapping("/exit")
    public SuccessResponse<HttpStatus> removeRoomPlayer(@RequestBody ExitReq exitReq){
        gameRoomService.removeRoomPlayer(exitReq.getRoomId(),exitReq.getUserId());
        ChatMessageRes exit= ChatMessageRes.builder()
                .type(MessageType.EXIT)
                .content(exitReq.getSender() + "님이 퇴장하셨습니다.")
                .writer("심심한 사과")
                .target(exitReq.getUserId())
                .build();
        simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + exitReq.getRoomId(), exit);
        return new SuccessResponse<>(HttpStatus.OK);
    }
}

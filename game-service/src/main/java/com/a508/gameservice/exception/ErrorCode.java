package com.a508.gameservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //Game
    PLAYER_IS_FULL_ERROR(404, "GME001", "제한 인원을 초과했습니다."),
    ROOM_IS_NOT_EXIST(404, "GME002", "해당 방이 존재하지 않습니다"),
    RESULT_IS_EMPTY(400, "GME003", "결과값이 없습니다.");

    private final int status;

    private final String code;

    private final String message;
}

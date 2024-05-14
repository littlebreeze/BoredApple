package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MyBattleRecordRes {

    //우승횟수, 총경기횟수 , 승률, 랭킹 , 점수
    private int victory;
    private int game;
    private int ranking;
    private int rating;
    private int odds;

}

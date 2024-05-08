package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopRankingRes {

    private Integer ranking;
    private String nickname;
    private Integer rating;
}

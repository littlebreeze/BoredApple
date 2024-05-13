package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultRes {

    private Integer ranking;
    private String userNickname;
    private Integer rating;
    private Integer diff;
}

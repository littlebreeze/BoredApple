package com.a508.gameservice.game.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingRes {

    private Integer myRanking;
    private String myNickName;
    private Integer myRating;
    private List<TopRankingRes> rankingList;

}

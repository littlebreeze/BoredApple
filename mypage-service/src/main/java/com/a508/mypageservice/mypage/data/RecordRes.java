package com.a508.mypageservice.mypage.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RecordRes {

	private int numberOfWin;

	private int numberOfGame;

	private int rating;

	private int rank;
}

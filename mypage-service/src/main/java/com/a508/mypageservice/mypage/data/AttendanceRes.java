package com.a508.mypageservice.mypage.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class AttendanceRes {

	private int days;

	private LocalDate registerDate;
}

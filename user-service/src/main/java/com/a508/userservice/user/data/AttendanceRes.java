package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class AttendanceRes {

	private Integer days;

	private Integer ratio;

	private LocalDate registerDate;
}

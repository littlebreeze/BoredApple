package com.a508.userservice.user.data;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DateReq {

	private Integer year;

	private Integer month;

	private Integer day;
}

package com.a508.userservice.user.data;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class YearMonthReq {

	private Integer year;

	private Integer month;
}


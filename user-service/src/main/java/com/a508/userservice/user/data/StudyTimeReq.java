package com.a508.userservice.user.data;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StudyTimeReq {

	private Integer hour;

	private Integer minute;
}

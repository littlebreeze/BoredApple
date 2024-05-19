package com.a508.studyservice.dto.response;

import java.util.List;

import lombok.Data;

@Data
public class FeignList {
	List<UserFeignResponse> users;
}

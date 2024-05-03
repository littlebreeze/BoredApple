package com.a508.studyservice.global.common.response;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SuccessResponse<T> {
	private int status;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private T data;

	public SuccessResponse(HttpStatus status, T data) {
		this.status = status.value();
		this.data = data;
	}

}

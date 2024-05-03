package com.a508.mypageservice.common.response;

public class SuccessResponse<T> extends BaseResponse<T> {

	public SuccessResponse(T data) {
		super("success", data);
	}
}

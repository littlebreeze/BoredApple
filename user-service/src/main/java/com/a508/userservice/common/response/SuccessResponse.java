package com.a508.userservice.common.response;


public class SuccessResponse<T> extends BaseResponse<T> {

    public SuccessResponse(T data) {
        super("success", data);
    }
}

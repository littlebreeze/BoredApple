package com.a508.gameservice.response;


public class SuccessResponse<T> extends BaseResponse<T> {

    public SuccessResponse(T data) {
        super("success", data);
    }
}

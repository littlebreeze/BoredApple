package com.a508.userservice.login.data;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GoogleUserInfoRes {

    private String id;  //구글 식별 id
    private String email;
    private String name;    //구글 닉네임(이름)
}

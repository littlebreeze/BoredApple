package com.a508.userservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-service")
public class UserServiceController {

    @GetMapping("/welcome")
    public String welcome(){
        return "Hi";
    }
}

package com.a508.studyservice.service;


import com.a508.studyservice.feign.client.UserServiceFeignClient;
import com.a508.studyservice.respository.EssayRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Transactional
@Service
@RequiredArgsConstructor
public class EssayService {

    private final EssayRepository essayRepository;
    private final UserServiceFeignClient userServiceFeignClient;

}

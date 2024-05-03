package com.a508.studyservice.service;


import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.repository.EssayRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Transactional
@Service
@RequiredArgsConstructor
public class EssayServiceImpl {

    private final EssayRepository essayRepository;
    private final UserServiceFeignClient userServiceFeignClient;

}

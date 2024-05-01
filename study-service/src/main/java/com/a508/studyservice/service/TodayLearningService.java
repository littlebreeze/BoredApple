package com.a508.studyservice.service;

import com.a508.studyservice.feign.client.UserServiceFeignClient;
import com.a508.studyservice.respository.TodayLearningRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class TodayLearningService {

    private final TodayLearningRepository todayLearningRepository;
    private final UserServiceFeignClient userServiceFeignClient;

}

package com.a508.studyservice.service;

import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.repository.TodayLearningRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class TodayLearningServiceImpl {

    private final TodayLearningRepository todayLearningRepository;
    private final UserServiceFeignClient userServiceFeignClient;

}

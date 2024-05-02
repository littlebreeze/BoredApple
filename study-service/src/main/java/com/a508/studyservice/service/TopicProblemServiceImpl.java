package com.a508.studyservice.service;

import com.a508.studyservice.respository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
public class TopicProblemServiceImpl {
    private final TopicRepository topicRepository;
}

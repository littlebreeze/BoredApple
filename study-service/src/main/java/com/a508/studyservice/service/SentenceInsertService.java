package com.a508.studyservice.service;

import com.a508.studyservice.respository.SentenceInsertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
public class SentenceInsertService {

    private final SentenceInsertRepository sentenceInsertRepository;


}

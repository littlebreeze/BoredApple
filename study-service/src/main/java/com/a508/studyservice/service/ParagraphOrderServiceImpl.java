package com.a508.studyservice.service;

import com.a508.studyservice.repository.ParagraphOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
public class ParagraphOrderServiceImpl {

    private final ParagraphOrderRepository paragraphOrderRepository;
}

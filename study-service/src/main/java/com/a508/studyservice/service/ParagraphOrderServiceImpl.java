package com.a508.studyservice.service;

import com.a508.studyservice.dto.request.ProblemRequest;
import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.repository.ParagraphOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
public class ParagraphOrderServiceImpl implements  ParagraphOrderService{

    private final ParagraphOrderRepository paragraphOrderRepository;

    @Override
    public List<ProblemResponse> getParagraphProblems(String token, ProblemRequest problemRequest) {
        return null;
    }
}

package com.a508.studyservice.service;

import com.a508.studyservice.dto.request.ProblemRequest;
import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.repository.SentenceInsertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly =true)
@RequiredArgsConstructor
public class SentenceInsertServiceImpl  implements  SentenceInsertService{

    private final SentenceInsertRepository sentenceInsertRepository;


    @Override
    public List<ProblemResponse> getSentenceProblems(String token, ProblemRequest problemRequest) {
        return null;
    }
}

package com.a508.studyservice.service;


import com.a508.studyservice.dto.request.EssayRequest;
import com.a508.studyservice.dto.response.EssayResponse;
import com.a508.studyservice.repository.EssayRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Transactional
@Service
@RequiredArgsConstructor
public class EssayServiceImpl  implements  EssayService{

    private final EssayRepository essayRepository;

    @Override
    public EssayResponse getResultEssay(EssayRequest essayRequest) {
        return null;
    }
}

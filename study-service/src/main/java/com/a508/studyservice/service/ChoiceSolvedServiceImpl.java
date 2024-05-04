package com.a508.studyservice.service;


import com.a508.studyservice.dto.response.ChoiceSolvedResponse;
import com.a508.studyservice.repository.ChoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class ChoiceSolvedServiceImpl  implements  ChoiceSolvedService{

    private final ChoiceRepository choiceRepository;


    @Override
    public List<ChoiceSolvedResponse> getTodayChoice(String token) {
        return null;
    }

    @Override
    public List<ChoiceSolvedResponse> getSpecificChoice(String token, LocalDateTime localDateTime) {
        return null;
    }
}


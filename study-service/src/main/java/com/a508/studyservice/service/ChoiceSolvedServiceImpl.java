package com.a508.studyservice.service;


import com.a508.studyservice.respository.ChoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Transactional
@Service
@RequiredArgsConstructor
public class ChoiceSolvedServiceImpl {

    private final ChoiceRepository choiceRepository;



}


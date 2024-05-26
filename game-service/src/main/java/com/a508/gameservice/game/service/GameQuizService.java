package com.a508.gameservice.game.service;

import com.a508.gameservice.game.domain.GameQuiz;
import com.a508.gameservice.game.repository.GameQuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameQuizService {

    private final GameQuizRepository gameQuizRepository;

    public List<GameQuiz> getQuiz(int quizCount) {
        List<GameQuiz> gameQuizList = new ArrayList<>();

        if (quizCount == 5) {
            //675, 673, 676,346,672
            int[] quizNum = {675, 673, 676, 346, 672};
            for (int i = 0; i < 5; i++) {
                gameQuizList.add(gameQuizRepository.findById(quizNum[i]).orElseThrow());
            }
        } else {
            List<GameQuiz> list = gameQuizRepository.findAll();
            SecureRandom secureRandom = new SecureRandom();
            for (int i = 0; i < quizCount; i++) {
                gameQuizList.add(list.get(secureRandom.nextInt(list.size())));
            }
        }
        return gameQuizList;
    }
}

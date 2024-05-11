package com.a508.gameservice.game.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameQuiz {

    @Id
    Integer id;

    @Column(nullable = false)
    String quiz;

    @Column(nullable = false)
    String answer;

}

package com.a508.gameservice.game.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BattleRecord {

    @Id
    Integer id;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer victory;

    @Column(nullable = false)
    @ColumnDefault("0")
    Integer game;

    @Column(nullable = false)
    @ColumnDefault("1500")
    Integer rating;

    public void gameUp() {
        this.game = game+1;
    }

    public void victoryUp() {
        this.victory = victory+1;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}

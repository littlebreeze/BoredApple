package com.a508.gameservice.game.domain;

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

    @ColumnDefault("0")
    Integer victory;

    @ColumnDefault("0")
    Integer game;

    @ColumnDefault("1500")
    Integer rating;

}

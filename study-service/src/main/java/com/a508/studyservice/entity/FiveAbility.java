package com.a508.studyservice.entity;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FiveAbility {

    private Integer fact;
    private Integer inference;
    private Integer voca;
    private Integer recognition;
    private Integer speed;
}

package com.a508.studyservice.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class SentenceInsert {
    //문장 삽입
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    //정독 훈련
    private String content1;

    private String content2;

    private String option1;

    private String option2;

    private String option3;

    private Integer answer;

    private String category;
}

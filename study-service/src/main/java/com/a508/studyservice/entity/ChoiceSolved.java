package com.a508.studyservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class ChoiceSolved {
    //객관시 고른 거

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private Integer userAnswer;

    private Integer answer;

    //어떤 유형 문제인지
    private String type;

    private Integer problemId;

    private Integer spendTime;

    private boolean correct;

    @CreatedDate
    private LocalDateTime createdAt;



}

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
public class EssaySolved {
    //주관식 푼 거
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private Integer problemId;

    private String myAnswer;

    private String answer;

    private Integer similarity;

    private String category;

    @CreatedDate
    private LocalDateTime createdAt;
}

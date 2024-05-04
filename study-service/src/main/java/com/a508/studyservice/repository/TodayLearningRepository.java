package com.a508.studyservice.repository;


import com.a508.studyservice.entity.TodayLearning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodayLearningRepository  extends JpaRepository<TodayLearning,Integer> {

    List<TodayLearning> findByUserId(Integer userId);

    List<TodayLearning> findByUserIdAndCreateAt(Integer userId, LocalDateTime createAt);
 }

package com.a508.studyservice.repository;


import com.a508.studyservice.entity.TodayLearning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodayLearningRepository  extends JpaRepository<TodayLearning,Integer> {
}

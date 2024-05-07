package com.a508.studyservice.repository;

import java.util.List;

import com.a508.studyservice.entity.SentenceInsert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentenceInsertRepository extends JpaRepository<SentenceInsert,Integer> {
	List<SentenceInsert> findByCategory(String category);
}

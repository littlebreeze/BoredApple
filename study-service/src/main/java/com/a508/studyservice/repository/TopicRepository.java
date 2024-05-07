package com.a508.studyservice.repository;


import java.util.List;

import com.a508.studyservice.entity.TopicProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository  extends JpaRepository<TopicProblem,Integer> {
	List<TopicProblem>  findByCategory(String category);
}

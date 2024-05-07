package com.a508.studyservice.repository;

import java.util.List;

import com.a508.studyservice.entity.ParagraphOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParagraphOrderRepository extends JpaRepository<ParagraphOrder,Integer> {

	List<ParagraphOrder>  findByCategory(String category);
}

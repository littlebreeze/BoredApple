package com.a508.studyservice.respository;

import com.a508.studyservice.entity.ParagraphOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParagraphOrderRepository extends JpaRepository<ParagraphOrder,Integer> {
}

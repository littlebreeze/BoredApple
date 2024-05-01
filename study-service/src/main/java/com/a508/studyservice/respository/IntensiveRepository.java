package com.a508.studyservice.respository;

import com.a508.studyservice.entity.Intensive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntensiveRepository extends JpaRepository<Intensive,Integer> {
}

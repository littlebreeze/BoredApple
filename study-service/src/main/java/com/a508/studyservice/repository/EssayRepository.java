package com.a508.studyservice.repository;


import com.a508.studyservice.entity.EssaySolved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayRepository extends JpaRepository<EssaySolved,Integer> {

    EssaySolved findByProblemId(Integer problemId);

}

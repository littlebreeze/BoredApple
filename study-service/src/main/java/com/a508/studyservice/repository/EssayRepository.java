package com.a508.studyservice.repository;


import java.util.List;
import java.util.Optional;

import com.a508.studyservice.entity.EssaySolved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayRepository extends JpaRepository<EssaySolved,Integer> {

    EssaySolved findByProblemId(Integer problemId);

    EssaySolved findByUserIdAndProblemId(Integer userId, Integer problemId);

    List<EssaySolved> findByUserId(Integer userId);

}

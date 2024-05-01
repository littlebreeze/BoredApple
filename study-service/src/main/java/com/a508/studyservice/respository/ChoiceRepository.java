package com.a508.studyservice.respository;


import com.a508.studyservice.entity.ChoiceSolved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoiceRepository extends JpaRepository<ChoiceSolved,Integer> {

}

package com.a508.studyservice.respository;


import com.a508.studyservice.entity.Essay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EssayRepository extends JpaRepository<Essay,Integer> {
}

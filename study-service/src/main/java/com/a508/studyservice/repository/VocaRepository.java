package com.a508.studyservice.repository;

import java.util.List;

import com.a508.studyservice.entity.Voca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocaRepository  extends JpaRepository<Voca,Integer> {

	List<Voca>  findByCategory(String category);
}

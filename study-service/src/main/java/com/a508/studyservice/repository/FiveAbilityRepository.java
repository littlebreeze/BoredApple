package com.a508.studyservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a508.studyservice.entity.FiveAbility;

public interface FiveAbilityRepository extends JpaRepository<FiveAbility, Integer> {

	FiveAbility findByUserId(int userId);

}

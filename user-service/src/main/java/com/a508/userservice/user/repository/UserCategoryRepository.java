package com.a508.userservice.user.repository;

import com.a508.userservice.user.domain.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Integer> {

	List<UserCategory> findByUserId(int userId);
}

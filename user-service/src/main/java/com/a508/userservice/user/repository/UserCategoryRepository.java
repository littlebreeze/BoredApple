package com.a508.userservice.user.repository;

import com.a508.userservice.user.domain.UserCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Integer> {

	UserCategory findByUserId(int userId);
}

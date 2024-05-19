package com.a508.userservice.user.repository;

import com.a508.userservice.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByGoogleId(String googleId);

	@Query("SELECT MAX(u.id) FROM User u")
	Integer findMaxUserId();

}

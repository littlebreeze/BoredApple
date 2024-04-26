package com.a508.userservice.user.repository;

import com.a508.userservice.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByGoogleId(String googleId);
}

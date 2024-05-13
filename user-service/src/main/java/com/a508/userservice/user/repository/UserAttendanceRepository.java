package com.a508.userservice.user.repository;

import com.a508.userservice.user.domain.UserAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface UserAttendanceRepository extends JpaRepository<UserAttendance, Integer> {

	List<UserAttendance> findByUserId(int userId);

	@Query("SELECT ua FROM UserAttendance ua WHERE ua.userId = :userId AND ua.attendanceDate = :date")
	List<UserAttendance> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
}

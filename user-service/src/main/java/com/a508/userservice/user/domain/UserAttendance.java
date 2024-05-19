package com.a508.userservice.user.domain;

import com.a508.userservice.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAttendance extends BaseEntity {

	@Column(nullable = false)
	private Integer userId;

	@Column(nullable = false)
	private LocalDate attendanceDate;

}

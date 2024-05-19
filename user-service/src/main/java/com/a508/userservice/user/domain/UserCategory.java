package com.a508.userservice.user.domain;

import com.a508.userservice.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCategory extends BaseEntity {

	@Column(nullable = false)
	private Integer userId;

	@Column(nullable = false)
	private String category;

}

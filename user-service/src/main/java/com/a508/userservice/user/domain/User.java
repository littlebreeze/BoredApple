package com.a508.userservice.user.domain;

import com.a508.userservice.common.entity.BaseEntity;
import com.a508.userservice.user.data.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.Collection;


@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Column(nullable = false)
    private String googleId;

    @Column(nullable = false)
    private String email;

    private String nickname;

    private String studyTime;

    @ColumnDefault("1")
    @Column(nullable = false)
    private Integer signUpProcess;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.ROLE_USER;

    public Collection<String> getRoles() {
        Collection<String> roles = new ArrayList<>();
        roles.add(role.getValue());
        return roles;
    }

}

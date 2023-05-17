package com.budget.mate.domain;

import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserStatus;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String username;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<RoleEntity> roleEntities;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;
    @OneToOne(orphanRemoval = true)
    private ProfileEntity profileEntity;

    public boolean hasAvatar() {
        return this.getProfileEntity().getAvatar() != null;
    }

    public boolean hasRole(String role) {
        return this.roleEntities.stream().anyMatch(roleEntity -> roleEntity.getRoleName().equals(role));
    }

    public Set<RoleEntity> appendRole(RoleEntity roleEntity) {
        this.roleEntities.add(roleEntity);
        return this.roleEntities;
    }
}

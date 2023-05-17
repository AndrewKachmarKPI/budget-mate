package com.budget.mate.repositories;

import com.budget.mate.domain.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Boolean existsByRoleName(String name);
    Optional<RoleEntity> findByRoleName(String roleName);
}

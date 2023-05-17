package com.budget.mate.services;

import com.budget.mate.domain.RoleEntity;
import com.budget.mate.enums.UserRoles;
import com.budget.mate.repositories.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Service
public class RoleServiceImpl implements RoleService {
    @Resource
    private RoleRepository repository;

    @Override
    public void createDefaultRoles() {
        for (UserRoles role : UserRoles.values()) {
            if (!this.repository.existsByRoleName(role.getRoleTitle())) {
                RoleEntity roleEntity = RoleEntity.builder()
                        .roleName(role.getRoleTitle())
                        .created(LocalDateTime.now())
                        .icon(role.getIcon())
                        .style(role.getStyle()).build();
                repository.save(roleEntity);
            }
        }
    }

    @Override
    public RoleEntity findRoleByName(String role) {
        return repository.findByRoleName(role)
                .orElseThrow(() -> new RuntimeException("Role with name " + role + " is not found!"));
    }
}

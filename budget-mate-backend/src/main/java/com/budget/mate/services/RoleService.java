package com.budget.mate.services;

import com.budget.mate.domain.RoleEntity;
import com.budget.mate.enums.UserRoles;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {
    void createDefaultRoles();

    RoleEntity findRoleByName(String role);
}

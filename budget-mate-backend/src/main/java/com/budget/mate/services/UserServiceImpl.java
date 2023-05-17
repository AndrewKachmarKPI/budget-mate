package com.budget.mate.services;

import com.budget.mate.domain.ProfileEntity;
import com.budget.mate.domain.RoleEntity;
import com.budget.mate.domain.UserEntity;
import com.budget.mate.dto.RegisterUserDto;
import com.budget.mate.dto.UserDto;
import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserRoles;
import com.budget.mate.enums.UserStatus;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.ProfileRepository;
import com.budget.mate.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserRepository userRepository;
    @Resource
    private ProfileRepository profileRepository;
    @Resource
    private RoleService roleService;
    @Resource
    private Mapper mapper;

    @Override
    @Transactional
    public UserDto register(RegisterUserDto registerUserDto) {
        if (userRepository.existsByUsername(registerUserDto.getUsername())) {
            throw new RuntimeException("User with username [" + registerUserDto.getUsername() + "] already exits");
        }
        System.out.println("INPUT_>"+ registerUserDto);
        ProfileEntity profileEntity = profileRepository.save(ProfileEntity.builder()
                .registered(LocalDateTime.now())
                .billingPlan(BillingPlan.BASIC)
                .email(registerUserDto.getEmail()).build());

        UserEntity userEntity = UserEntity.builder()
                .userStatus(UserStatus.NEW)
                .username(registerUserDto.getUsername())
                .password(mapper.encode(registerUserDto.getPassword()))
                .roleEntities(Set.of(roleService.findRoleByName(UserRoles.BASIC_CLIENT.getRoleTitle())))
                .profileEntity(profileEntity)
                .build();

        return mapper.userToDto(userRepository.save(userEntity));
    }

    @Override
    public UserDto promoteUser(String username, UserRoles userRole) {
        UserEntity userEntity = findUserEntity(username);
        if (userEntity.hasRole(userRole.getRoleTitle())) {
            throw new RuntimeException("User already has role [" + userRole.getTitle() + "]");
        }
        RoleEntity roleEntity = roleService.findRoleByName(UserRoles.BASIC_CLIENT.getRoleTitle());
        userEntity = userEntity.toBuilder()
                .roleEntities(userEntity.appendRole(roleEntity))
                .build();
        return mapper.userToDto(userRepository.save(userEntity));
    }

    @Override
    public void registerDefaultUsers() {
        if (!userRepository.existsByUsername("budget-admin")) {
            RegisterUserDto registerUserDto = RegisterUserDto.builder()
                    .username("budget-admin")
                    .password("11111111")
                    .email("admin@gmail.com")
                    .build();
            register(registerUserDto);
            promoteUser(registerUserDto.getUsername(), UserRoles.ADMIN);
        }
    }

    private UserEntity findUserEntity(String username) {
        if (!userRepository.existsByUsername(username)) {
            throw new RuntimeException("User with name [" + username + "] is not found");
        }
        return userRepository.findByUsername(username);
    }
}

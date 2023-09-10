package com.budget.mate.services;

import com.budget.mate.domain.ProfileEntity;
import com.budget.mate.domain.RoleEntity;
import com.budget.mate.domain.UserEntity;
import com.budget.mate.dto.ProfileDto;
import com.budget.mate.dto.RegisterUserDto;
import com.budget.mate.dto.UserDto;
import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserRoles;
import com.budget.mate.enums.UserStatus;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.ProfileRepository;
import com.budget.mate.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final RoleService roleService;
    private final FileService fileService;
    private final Mapper mapper;

    @Override
    @Transactional
    public UserDto register(RegisterUserDto registerUserDto) {
        if (userRepository.existsByUsername(registerUserDto.getUsername())) {
            throw new RuntimeException("User with username [" + registerUserDto.getUsername() + "] already exits");
        }
        ProfileEntity profileEntity = profileRepository.save(ProfileEntity.builder()
                .avatar(fileService.findAvatarUrlByName("chicken.png"))
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
        RoleEntity roleEntity = roleService.findRoleByName(userRole.getRoleTitle());
        userEntity = userEntity.toBuilder()
                .roleEntities(userEntity.appendRole(roleEntity))
                .build();
        return mapper.userToDto(userRepository.save(userEntity));
    }

    @Override
    public UserDto changeBilling(UserRoles roles) {
        UserEntity userEntity = findUserEntity(mapper.username());
        BillingPlan billingPlan = userEntity.getProfileEntity().getBillingPlan();
        if (roles == UserRoles.BASIC_CLIENT) billingPlan = BillingPlan.BASIC;
        if (roles == UserRoles.PREMIUM_CLIENT) billingPlan = BillingPlan.PREMIUM;
        if (roles == UserRoles.PRO_CLIENT) billingPlan = BillingPlan.PRO;

        userEntity.getProfileEntity().setBillingPlan(billingPlan);
        profileRepository.save(userEntity.getProfileEntity());
        userRepository.save(userEntity);
        return promoteUser(mapper.username(), roles);
    }

    @Override
    public UserDto getUser() {
        UserEntity userEntity = findUserEntity(mapper.username());
        return mapper.userToDto(userEntity);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(userEntity -> {
            UserDto user = mapper.userToDto(userEntity);
            user.setRoles(userEntity.getRoleEntities().stream().map(roleEntity -> mapper.roleToDto(roleEntity)).collect(Collectors.toList()));
            return user;
        }).collect(Collectors.toList());
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
            UserEntity userEntity = findUserEntity(registerUserDto.getUsername());
            ProfileEntity profileEntity = userEntity.getProfileEntity().toBuilder()
                    .firstName("Alex")
                    .lastName("Pick")
                    .phoneNumber("0688463078")
                    .email("admin@gmail.com")
                    .billingPlan(BillingPlan.PRO)
                    .build();
            profileEntity = profileRepository.save(profileEntity);
            userEntity.setProfileEntity(profileEntity);
            userRepository.save(userEntity);
        }
    }

    @Override
    public String changeAvatar(String fileId) {
        UserEntity userEntity = findUserEntity(mapper.username());
        String avatar = fileService.findAvatarUrlById(fileId);
        userEntity.getProfileEntity().setAvatar(avatar);
        profileRepository.save(userEntity.getProfileEntity());
        userRepository.save(userEntity);
        return avatar;
    }

    @Override
    public void changeAvatar(ProfileDto profileDto) {
        UserEntity userEntity = findUserEntity(mapper.username());
        userEntity.getProfileEntity().setFirstName(profileDto.getFirstName());
        userEntity.getProfileEntity().setLastName(profileDto.getLastName());
        userEntity.getProfileEntity().setPhoneNumber(profileDto.getPhoneNumber());
        userEntity.getProfileEntity().setEmail(profileDto.getEmail());
        userEntity.getProfileEntity().setCurrency(profileDto.getCurrency());
        profileRepository.save(userEntity.getProfileEntity());
        userRepository.save(userEntity);
    }

    private UserEntity findUserEntity(String username) {
        if (!userRepository.existsByUsername(username)) {
            throw new RuntimeException("User with name [" + username + "] is not found");
        }
        return userRepository.findByUsername(username);
    }
}

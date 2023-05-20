package com.budget.mate.services;

import com.budget.mate.dto.ProfileDto;
import com.budget.mate.dto.RegisterUserDto;
import com.budget.mate.dto.UserDto;
import com.budget.mate.enums.UserRoles;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    void registerDefaultUsers();

    String changeAvatar(String fileId);

    void changeAvatar(ProfileDto profileDto);

    UserDto register(RegisterUserDto registerUserDto);

    UserDto promoteUser(String username, UserRoles userRole);

    UserDto changeBilling(UserRoles roles);

    UserDto getUser();

    List<UserDto> getAllUsers();
}

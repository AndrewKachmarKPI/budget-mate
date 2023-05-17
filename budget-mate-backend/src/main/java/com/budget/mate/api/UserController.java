package com.budget.mate.api;

import com.budget.mate.dto.RegisterUserDto;
import com.budget.mate.dto.UserDto;
import com.budget.mate.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {
    @Resource
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(userService.register(registerUserDto));
    }
}

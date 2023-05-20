package com.budget.mate.api;

import com.budget.mate.dto.ProfileDto;
import com.budget.mate.dto.RegisterUserDto;
import com.budget.mate.dto.UserDto;
import com.budget.mate.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {
    @Resource
    private UserService userService;
    @Autowired
    private ApplicationContext context;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(userService.register(registerUserDto));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> myUser() {
        return ResponseEntity.ok(userService.getUser());
    }

    @PostMapping("/change-avatar")
    public ResponseEntity<String> changeAvatar(@RequestParam("fileId") String fileId) {
        return ResponseEntity.ok(userService.changeAvatar(fileId));
    }

    @PostMapping("/change-profile")
    public void changeAvatar(@RequestBody ProfileDto profileDto) {
        userService.changeAvatar(profileDto);
    }

    @DeleteMapping("/logout")
    public void revokeToken(HttpServletRequest request) {
        ConsumerTokenServices tokenServices = context.getBean("tokenServices", ConsumerTokenServices.class);
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.contains("Bearer")) {
            String tokenId = authorization.substring("Bearer".length() + 1);
            tokenServices.revokeToken(tokenId);
        }
    }
}

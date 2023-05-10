package com.budget.mate.services;

import com.budget.mate.domain.UserEntity;
import com.budget.mate.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Resource
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity userEntity = userRepository.findByUsername(username);

        if (userEntity != null) {
            List<GrantedAuthority> authorities = userEntity.getRoleEntities()
                    .stream().map(roles -> new SimpleGrantedAuthority(roles.getRoleName()))
                    .collect(Collectors.toList());
            return new User(userEntity.getPhoneNumber(), userEntity.getPassword(), authorities);
        }
        throw new RuntimeException("Invalid credentials!");
    }
}

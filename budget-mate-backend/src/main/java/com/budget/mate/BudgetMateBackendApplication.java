package com.budget.mate;

import com.budget.mate.services.FileService;
import com.budget.mate.services.RoleService;
import com.budget.mate.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BudgetMateBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BudgetMateBackendApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedOrigins("http://localhost:4200");
            }
        };
    }

    @Bean
    CommandLineRunner init(RoleService roleService, UserService userService, FileService fileService) {
        return args -> {
            fileService.loadDefaultAvatars();
            roleService.createDefaultRoles();
            userService.registerDefaultUsers();
        };
    }
}

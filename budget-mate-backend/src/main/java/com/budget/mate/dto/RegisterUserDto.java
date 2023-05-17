package com.budget.mate.dto;

import lombok.*;

@Builder(toBuilder = true)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    private String username;
    private String email;
    private String password;
}

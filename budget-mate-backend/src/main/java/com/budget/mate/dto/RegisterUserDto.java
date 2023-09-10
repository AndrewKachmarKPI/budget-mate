package com.budget.mate.dto;

import lombok.*;

import javax.validation.constraints.*;

@Builder(toBuilder = true)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @NotNull
    @Email
    @Size(min = 6, max = 100)
    private String email;

    @NotNull
    @Size(min = 6, max = 100)
    private String password;
}

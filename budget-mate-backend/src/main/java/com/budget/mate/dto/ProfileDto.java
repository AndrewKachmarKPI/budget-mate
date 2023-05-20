package com.budget.mate.dto;

import lombok.*;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String currency;
}

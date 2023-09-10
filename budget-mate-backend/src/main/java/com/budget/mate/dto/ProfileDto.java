package com.budget.mate.dto;

import lombok.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
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

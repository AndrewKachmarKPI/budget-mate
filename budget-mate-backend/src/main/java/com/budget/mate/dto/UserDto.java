package com.budget.mate.dto;

import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserStatus;
import lombok.*;

import java.time.LocalDateTime;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String username;
    private UserStatus userStatus;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String currency;
    private BillingPlan billingPlan;
    private LocalDateTime registered;
    private String avatarId;
}

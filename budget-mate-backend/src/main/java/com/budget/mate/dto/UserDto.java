package com.budget.mate.dto;

import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
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

    private List<RoleDto> roles = new ArrayList<>();
}

package com.budget.mate.dto;

import lombok.*;
import java.time.LocalDateTime;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
@Builder(toBuilder = true)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private String icon;
    private String style;
    private String roleName;
    private LocalDateTime created;
}

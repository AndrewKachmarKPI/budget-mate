package com.budget.mate.dto;

import lombok.*;
import java.time.LocalDateTime;

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

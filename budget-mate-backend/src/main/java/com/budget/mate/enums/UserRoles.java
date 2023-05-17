package com.budget.mate.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRoles {
    ADMIN("ADMIN", "bx-cog", "bg-label-success"),
    BASIC_CLIENT("BASIC_CLIENT", "bx-user", "bg-label-primary"),
    PREMIUM_CLIENT("PREMIUM_CLIENT", "bx-package", "bg-label-info"),
    PRO_CLIENT("PREMIUM_CLIENT", "bx-trophy", "bg-label-warning");
    private String title;
    private String icon;
    private String style;

    public String getRoleTitle() {
        return "ROLE_" + title;
    }
}

package com.budget.mate.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserRoles {
   ADMIN("ADMIN"), BASIC_CLIENT("BASIC_CLIENT");

   private String title;

   public String getTitle() {
      return "ROLE_" + title;
   }
}

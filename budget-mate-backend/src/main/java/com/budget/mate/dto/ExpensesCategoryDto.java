package com.budget.mate.dto;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpensesCategoryDto {
    private String categoryId;
    private String name;
    private String icon;
    private LocalDateTime created;
}

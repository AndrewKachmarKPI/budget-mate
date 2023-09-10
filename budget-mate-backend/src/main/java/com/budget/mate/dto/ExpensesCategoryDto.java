package com.budget.mate.dto;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

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

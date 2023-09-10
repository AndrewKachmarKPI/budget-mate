package com.budget.mate.dto;

import lombok.*;

import java.time.LocalDate;
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
public class CreateBudgetDto {
    @NotNull
    @Size(min = 1, max = 50)
    private String name;

    @NotNull
    @PositiveOrZero
    private Double budget;

    @NotNull
    @Size(min = 1, max = 50)
    private String category;

    @NotNull
    private LocalDate deadline;
}

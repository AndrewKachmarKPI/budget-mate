package com.budget.mate.dto;

import com.budget.mate.domain.TransactionEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class BudgetDto {
    private String budgetId;

    @NotNull
    @Size(min = 1, max = 50)
    private String name;

    @NotNull
    @Size(min = 1, max = 100)
    private String owner;

    @NotNull
    @PositiveOrZero
    private Double budget;

    @NotNull
    @PositiveOrZero
    private Double expenses;

    @NotNull
    @Future
    private LocalDate deadline;

    @NotNull
    @Future
    private LocalDate created;

    @NotNull
    @Size(min = 1, max = 50)
    private String category;

    private List<TransactionDto> transactions;
}

package com.budget.mate.dto;

import com.budget.mate.domain.ExpensesCategoryEntity;
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
public class TransactionDto {
    private LocalDateTime created;
    private Double sum;
    private CardDto cardDto;
    private ExpensesCategoryDto category;
}

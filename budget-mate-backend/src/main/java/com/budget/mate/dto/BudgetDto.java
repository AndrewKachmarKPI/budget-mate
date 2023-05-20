package com.budget.mate.dto;

import com.budget.mate.domain.TransactionEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetDto {
    private String budgetId;
    private String name;
    private String owner;
    private Double budget;
    private Double expenses;
    private LocalDate deadline;
    private LocalDate created;
    private String category;
    private List<TransactionDto> transactions;
}
package com.budget.mate.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateBudgetDto {
    private String name;
    private Double budget;
    private String category;
    private LocalDate deadline;
}

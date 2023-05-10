package com.budget.mate.dto;

import lombok.*;

import java.time.LocalDate;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankDto {
    private Long id;
    private String bankId;
    private String bankName;
    private Double goal;
    private Double currentAmount;
    private LocalDate deadline;
}

package com.budget.mate.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

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
    private Boolean isClosed;
    private List<TransactionDto> transactions;
}

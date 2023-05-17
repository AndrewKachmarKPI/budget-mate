package com.budget.mate.dto;

import lombok.*;

import java.time.LocalDateTime;

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
}

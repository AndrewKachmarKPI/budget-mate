package com.budget.mate.dto;

import lombok.*;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankDto {
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    private String bankId;

    @NotNull
    @Size(min = 1, max = 100)
    private String bankName;

    @NotNull
    @PositiveOrZero
    private Double goal;

    @NotNull
    @PositiveOrZero
    private Double currentAmount;

    @NotNull
    @Future
    private LocalDate deadline;

    @NotNull
    private Boolean isClosed;

    private List<TransactionDto> transactions;
}

package com.budget.mate.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BankEntity {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false, updatable = false, unique = true)
    private String bankId;
    @Column(nullable = false, updatable = false)
    private String ownerUsername;
    @Column(nullable = false)
    private String bankName;
    @Column(nullable = false, updatable = false)
    private Double goal;
    @Column(nullable = false, updatable = false)
    private Double currentAmount;
    @Column(nullable = false)
    private LocalDate deadline;
    @OneToMany
    private List<TransactionEntity> transactions;
}

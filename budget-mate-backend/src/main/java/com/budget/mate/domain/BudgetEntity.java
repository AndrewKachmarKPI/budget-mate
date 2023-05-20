package com.budget.mate.domain;

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
@Entity
public class BudgetEntity {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false, updatable = false, unique = true)
    private String budgetId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, updatable = false)
    private String owner;
    @Column(nullable = false, updatable = false)
    private Double budget;
    @Column(nullable = false)
    private Double expenses;
    @Column(nullable = false)
    private LocalDate created;
    @Column(nullable = false)
    private LocalDate deadline;
    @Column
    private String category;
    @OneToMany
    private List<TransactionEntity> transactions;
}

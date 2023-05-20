package com.budget.mate.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@EqualsAndHashCode
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Entity
public class ExpensesCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String categoryId;
    @Column(nullable = false)
    private String owner;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String icon;
    @Column(nullable = false)
    private LocalDateTime created;
}

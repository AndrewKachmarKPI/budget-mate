package com.budget.mate.domain;

import com.budget.mate.enums.CardType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, updatable = false, unique = true)
    private String cardId;
    @Column(nullable = false, unique = true)
    private String number;
    @Column
    private String name;
    @Column
    private String holder;
    @Column(nullable = false)
    private String expirationDate;
    @Column(nullable = false)
    private String secretCode;
    @Column(nullable = false)
    private Boolean isPrimary;
    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private CardType type;
}

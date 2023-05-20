package com.budget.mate.domain;

import com.budget.mate.enums.BillingPlan;
import com.budget.mate.enums.UserStatus;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@EqualsAndHashCode
@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column(nullable = false)
    private String email;
    @Column(unique = true)
    private String phoneNumber;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BillingPlan billingPlan;
    @Column(nullable = false)
    private LocalDateTime registered;
    private String avatar;
    private String currency = "";
}

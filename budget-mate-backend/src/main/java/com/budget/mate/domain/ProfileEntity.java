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
@Builder
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
    @Column
    @Pattern(regexp = "^$|^([A-Za-z0-9+_.-]{2,100}@)([a-z_.-]{1,100})([.])([a-z]{2,4})$")
    private String email;
    @Column(unique = true)
    private String phoneNumber;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BillingPlan billingPlan;
    @Column(nullable = false)
    private LocalDateTime registered;
    @OneToOne
    private FileEntity avatar;
}

package com.budget.mate.domain;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode
@Getter
@Setter
@Builder
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Entity
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String roleName;
}

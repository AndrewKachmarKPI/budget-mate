package com.budget.mate.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @Column(nullable = false, unique = true)
    private String icon;
    @Column(nullable = false, unique = true)
    private String style;
    @Column(nullable = false, unique = true)
    private String roleName;
    @Column(nullable = false)
    private LocalDateTime created;
}

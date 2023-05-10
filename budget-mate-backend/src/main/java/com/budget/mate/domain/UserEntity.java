package com.budget.mate.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Set;

@EqualsAndHashCode
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    @Pattern(regexp = "^$|^([A-Za-z0-9+_.-]{2,100}@)([a-z_.-]{1,100})([.])([a-z]{2,4})$")
    private String email;
    @Column(unique = true, nullable = false)
    private String phoneNumber;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<RoleEntity> roleEntities;

}

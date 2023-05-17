package com.budget.mate.repositories;


import com.budget.mate.domain.ProfileEntity;
import com.budget.mate.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

}

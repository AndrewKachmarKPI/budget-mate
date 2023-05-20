package com.budget.mate.repositories;

import com.budget.mate.domain.BudgetEntity;
import com.budget.mate.domain.ExpensesCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpensesCategoryRepository extends JpaRepository<ExpensesCategoryEntity, Long> {
    Optional<ExpensesCategoryEntity> findByCategoryId(String categoryId);

    List<ExpensesCategoryEntity> findAllByOwner(String owner);

    Boolean existsByOwnerAndName(String owner, String name);
}

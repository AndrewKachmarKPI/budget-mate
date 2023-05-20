package com.budget.mate.repositories;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.domain.BudgetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<BudgetEntity, Long> {
    Optional<BudgetEntity> findByBudgetId(String budgetId);

    List<BudgetEntity> findAllByOwner(String owner);

    Boolean existsByOwnerAndName(String owner, String name);
}

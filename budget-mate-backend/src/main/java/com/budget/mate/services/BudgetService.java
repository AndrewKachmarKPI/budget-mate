package com.budget.mate.services;

import com.budget.mate.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BudgetService {
    ExpensesCategoryDto createCategory(String name, String icon);

    List<ExpensesCategoryDto> findAllCategories();

    BudgetDto createBudget(CreateBudgetDto createBudgetDto);

    List<BudgetDto> findAllBudgets();

    BudgetDto findBudgetById(String budgetId);

    TransactionDto createTransaction(Double sum, String budgetId, String categoryId, String cardId);
}

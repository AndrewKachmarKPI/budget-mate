package com.budget.mate.services;

import com.budget.mate.domain.*;
import com.budget.mate.dto.*;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {
    @Resource
    private BudgetRepository budgetRepository;
    @Resource
    private ExpensesCategoryRepository categoryRepository;
    @Resource
    private TransactionRepository transactionRepository;
    @Resource
    private CardRepository cardRepository;
    @Resource
    private Mapper mapper;

    @Override
    public ExpensesCategoryDto createCategory(String name, String icon) {
        if (categoryRepository.existsByOwnerAndName(mapper.username(), name)) {
            throw new RuntimeException("Expenses with name " + name + " already exist");
        }
        ExpensesCategoryEntity expensesCategory = ExpensesCategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .created(LocalDateTime.now())
                .owner(mapper.username())
                .icon(icon)
                .name(name).build();
        return mapper.expensesCategoryToDto(categoryRepository.save(expensesCategory));
    }

    @Override
    @Transactional
    public TransactionDto createTransaction(Double sum, String budgetId, String categoryId, String cardId) {
        ExpensesCategoryEntity category = categoryRepository.findByCategoryId(categoryId).orElseThrow(() -> new RuntimeException("Category is not found"));
        BudgetEntity budget = budgetRepository.findByBudgetId(budgetId).orElseThrow(() -> new RuntimeException("Budget is not found"));
        CardEntity cardEntity = cardRepository.findByCardId(cardId).orElseThrow(() -> new RuntimeException("Card is not found"));

        TransactionEntity transaction = TransactionEntity.builder()
                .created(LocalDateTime.now())
                .sum(sum)
                .category(category)
                .cardEntity(cardEntity)
                .build();
        transaction = transactionRepository.save(transaction);
        budget.getTransactions().add(transaction);
        budget.setExpenses(getBudgetExpenses(budget));

        budgetRepository.save(budget);
        return mapper.transactionEntityToDto(transaction);
    }

    @Override
    public List<ExpensesCategoryDto> findAllCategories() {
        return categoryRepository.findAllByOwner(mapper.username())
                .stream().map(expensesCategory -> mapper.expensesCategoryToDto(expensesCategory))
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDto createBudget(CreateBudgetDto createBudgetDto) {
        if (budgetRepository.existsByOwnerAndName(mapper.username(), createBudgetDto.getName())) {
            throw new RuntimeException("Expenses with name " + createBudgetDto.getName() + " already exist");
        }
        BudgetEntity budget = BudgetEntity.builder()
                .budgetId(UUID.randomUUID().toString())
                .name(createBudgetDto.getName())
                .owner(mapper.username())
                .budget(createBudgetDto.getBudget())
                .expenses(0.0)
                .deadline(createBudgetDto.getDeadline())
                .category(createBudgetDto.getCategory())
                .created(LocalDate.now())
                .transactions(new ArrayList<>())
                .build();
        return mapper.budgetToDto(budgetRepository.save(budget));
    }

    @Override
    public List<BudgetDto> findAllBudgets() {
        return budgetRepository.findAllByOwner(mapper.username())
                .stream().map(expensesCategory -> mapper.budgetToDto(expensesCategory))
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDto findBudgetById(String budgetId) {
        BudgetEntity budget = budgetRepository.findByBudgetId(budgetId).orElseThrow(() -> new RuntimeException("Budget is not found"));
        return mapper.budgetToDto(budget);
    }

    private Double getBudgetExpenses(BudgetEntity budget) {
        return budget.getTransactions().stream().map(TransactionEntity::getSum).mapToDouble(Double::doubleValue).sum();
    }
}

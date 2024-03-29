package com.budget.mate.api;

import com.budget.mate.dto.*;
import com.budget.mate.services.BankService;
import com.budget.mate.services.BudgetService;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/budgets")
public class BudgetController {
    @Resource
    private BudgetService budgetService;

    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@RequestBody CreateBudgetDto createBudgetDto) {
        return ResponseEntity.ok(budgetService.createBudget(createBudgetDto));
    }

    @PostMapping("/categories")
    public ResponseEntity<ExpensesCategoryDto> createBudgetCategory(@RequestParam("name") @NotNull @NotEmpty @NotBlank String name,
                                                                    @RequestParam("icon") @NotNull @NotEmpty @NotBlank String icon) {
        return ResponseEntity.ok(budgetService.createCategory(name, icon));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<ExpensesCategoryDto>> findAllCategories() {
        return ResponseEntity.ok(budgetService.findAllCategories());
    }

    @GetMapping
    public ResponseEntity<List<BudgetDto>> findAllBudgets() {
        return ResponseEntity.ok(budgetService.findAllBudgets());
    }

    @GetMapping("/{budgetId}")
    public ResponseEntity<BudgetDto> findAllBudgets(@PathVariable("budgetId") @NotNull @NotEmpty @NotBlank String budgetId) {
        return ResponseEntity.ok(budgetService.findBudgetById(budgetId));
    }

    @PutMapping("/{budgetId}")
    public ResponseEntity<TransactionDto> findAllBudgets(@PathVariable("budgetId") @NotNull @NotEmpty @NotBlank String budgetId,
                                                         @RequestParam("sum") @NotNull Double sum,
                                                         @RequestParam("categoryId") @NotNull @NotEmpty @NotBlank String categoryId,
                                                         @RequestParam("cardId") @NotNull @NotEmpty @NotBlank String cardId) {
        return ResponseEntity.ok(budgetService.createTransaction(sum, budgetId, categoryId, cardId));
    }

}

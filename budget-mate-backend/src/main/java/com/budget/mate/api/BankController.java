package com.budget.mate.api;

import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CreateBankDto;
import com.budget.mate.services.BankService;
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
@RequestMapping("/api/banks")
public class BankController {
    @Resource
    private BankService bankService;

    @PostMapping
    public ResponseEntity<BankDto> createBank(@Valid @RequestBody CreateBankDto createBankDto) {
        return ResponseEntity.ok(bankService.createBank(createBankDto));
    }

    @PostMapping("/top-up")
    public ResponseEntity<BankDto> topUpBank(@RequestParam("bankId") String bankId,
                                             @RequestParam("cardId") String cardId,
                                             @RequestParam("sum") Double sum) {
        return ResponseEntity.ok(bankService.topUpBank(bankId, cardId, sum));
    }

    @GetMapping("/{bankId}")
    public ResponseEntity<BankDto> getBankById(@PathVariable("bankId") @NotNull @NotEmpty @NotBlank String bankId) {
        return ResponseEntity.ok(bankService.getBankById(bankId));
    }

    @GetMapping
    public ResponseEntity<List<BankDto>> getMyBanks() {
        return ResponseEntity.ok(bankService.findMyBanks());
    }
}

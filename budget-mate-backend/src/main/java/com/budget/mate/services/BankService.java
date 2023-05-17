package com.budget.mate.services;

import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CreateBankDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BankService {
    BankDto createBank(CreateBankDto createBankDto);

    BankDto getBankById(String bankId);

    List<BankDto> findMyBanks();

    BankDto topUpBank(String bankId, String cardId, Double sum);
}

package com.budget.mate.services;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.domain.CardEntity;
import com.budget.mate.domain.TransactionEntity;
import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CreateBankDto;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.BankRepository;
import com.budget.mate.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {
    private final BankRepository bankRepository;
    private final TransactionRepository transactionRepository;
    private final Mapper bm;
    private final CardService cardService;

    @Override
    public BankDto createBank(CreateBankDto createBankDto) {
        if (bankRepository.existsByBankNameAndOwnerUsername(createBankDto.getTitle(), bm.username())) {
            throw new RuntimeException("Bank with name " + createBankDto.getTitle() + " already exists!");
        }
        BankEntity bankEntity = BankEntity.builder()
                .bankId(UUID.randomUUID().toString())
                .ownerUsername(bm.username())
                .bankName(createBankDto.getTitle())
                .currentAmount(0.0)
                .goal(createBankDto.getGoal())
                .deadline(LocalDate.parse(createBankDto.getDeadline()))
                .isClosed(false)
                .transactions(new ArrayList<>()).build();
        return bm.bankEntityToDto(bankRepository.save(bankEntity));
    }

    @Override
    public BankDto getBankById(String bankId) {
        return bm.bankEntityToDto(bankRepository.findByBankId(bankId).orElseThrow(() ->
                new RuntimeException("Bank with id " + bankId + " already exists!")));
    }

    @Override
    public List<BankDto> findMyBanks() {
        return bankRepository.findAllByOwnerUsernameOrderByDeadlineDesc(bm.username())
                .stream().map(bm::bankEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public BankDto topUpBank(String bankId, String cardId, Double sum) {
        CardEntity cardEntity = cardService.findCardEntityById(cardId);
        BankEntity bankEntity = getBankEntityById(bankId);
        List<TransactionEntity> transactions = bankEntity.getTransactions();
        TransactionEntity transaction = TransactionEntity.builder()
                .created(LocalDateTime.now())
                .sum(sum)
                .cardEntity(cardEntity)
                .build();
        transactions.add(transactionRepository.save(transaction));
        bankEntity.setTransactions(transactions);
        bankEntity.setCurrentAmount(getBankCurrentAmount(bankEntity));
        return bm.bankEntityToDto(bankRepository.save(bankEntity));
    }

    @Override
    public BankDto closeBank(String bankId, String cardId) {
        BankEntity bankEntity = getBankEntityById(bankId);
        if (!bankEntity.getGoal().equals(bankEntity.getCurrentAmount())) {
            throw new RuntimeException("Could not close bank");
        }
        bankEntity.setIsClosed(true);
        return bm.bankEntityToDto(bankRepository.save(bankEntity));
    }

    private BankEntity getBankEntityById(String bankId) {
        return bankRepository.findByBankId(bankId).orElseThrow(() ->
                new RuntimeException("Bank with id " + bankId + " already exists!"));
    }

    private Double getBankCurrentAmount(BankEntity bankEntity) {
        return bankEntity.getTransactions().stream().map(TransactionEntity::getSum).mapToDouble(Double::doubleValue).sum();
    }
}

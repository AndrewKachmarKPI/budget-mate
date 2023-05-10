package com.budget.mate.services;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CreateBankDto;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.BankRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BankServiceImpl implements BankService {
    @Resource
    private BankRepository bankRepository;
    @Resource
    private Mapper bm;

    private static final String OWNER_USERNAME = "username"; //FIXME replace with username

    @Override
    public BankDto createBank(CreateBankDto createBankDto) {
        if (bankRepository.existsByBankNameAndOwnerUsername(createBankDto.getTitle(), OWNER_USERNAME)) {
            throw new RuntimeException("Bank with name " + createBankDto.getTitle() + " already exists!");
        }
        BankEntity bankEntity = BankEntity.builder()
                .bankId(UUID.randomUUID().toString())
                .ownerUsername(OWNER_USERNAME)
                .bankName(createBankDto.getTitle())
                .currentAmount(0.0)
                .goal(createBankDto.getGoal())
                .deadline(LocalDate.parse(createBankDto.getDeadline())).build();
        return bm.bankEntityToDto(bankRepository.save(bankEntity));
    }

    @Override
    public BankDto getBankById(String bankId) {
        return bm.bankEntityToDto(bankRepository.findByBankId(bankId).orElseThrow(() ->
                new RuntimeException("Bank with id " + bankId + " already exists!")));
    }

    @Override
    public List<BankDto> findMyBanks() {
        return bankRepository.findAllByOwnerUsernameOrderByDeadlineDesc(OWNER_USERNAME)
                .stream().map(bankEntity -> bm.bankEntityToDto(bankEntity))
                .collect(Collectors.toList());
    }
}

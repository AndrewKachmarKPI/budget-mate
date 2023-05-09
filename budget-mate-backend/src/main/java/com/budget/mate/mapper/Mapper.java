package com.budget.mate.mapper;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.dto.BankDto;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    public BankDto bankEntityToDto(BankEntity bankEntity) {
        return BankDto.builder()
                .id(bankEntity.getId())
                .bankId(bankEntity.getBankId())
                .bankName(bankEntity.getBankName())
                .currentAmount(bankEntity.getCurrentAmount())
                .deadline(bankEntity.getDeadline())
                .goal(bankEntity.getGoal())
                .build();
    }
}

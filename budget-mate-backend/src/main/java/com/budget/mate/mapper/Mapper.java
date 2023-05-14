package com.budget.mate.mapper;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.domain.CardEntity;
import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CardDto;
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
    public CardDto cardEntityToDto(CardEntity cardEntity) {
        return CardDto.builder()
                .cardId(cardEntity.getCardId())
                .number(cardEntity.getNumber())
                .holderName(cardEntity.getHolder())
                .expirationDate(cardEntity.getExpirationDate())
                .secretCode(cardEntity.getSecretCode())
                .type(cardEntity.getType().getName())
                .build();
    }
}

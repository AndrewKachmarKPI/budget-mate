package com.budget.mate.mapper;

import com.budget.mate.domain.BankEntity;
import com.budget.mate.domain.CardEntity;
import com.budget.mate.domain.UserEntity;
import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CardDto;
import com.budget.mate.dto.UserDto;
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

    public UserDto userToDto(UserEntity userEntity) {
        UserDto userDto = UserDto.builder()
                .username(userEntity.getUsername())
                .userStatus(userEntity.getUserStatus())
                .firstName(userEntity.getProfileEntity().getFirstName())
                .lastName(userEntity.getProfileEntity().getLastName())
                .email(userEntity.getProfileEntity().getEmail())
                .phoneNumber(userEntity.getProfileEntity().getPhoneNumber())
                .billingPlan(userEntity.getProfileEntity().getBillingPlan())
                .registered(userEntity.getProfileEntity().getRegistered())
                .build();
        if (userEntity.hasAvatar()) {
            userDto = userDto.toBuilder()
                    .avatarId(userEntity.getProfileEntity().getAvatar().getFileId()).build();
        }
        return userDto;
    }
}

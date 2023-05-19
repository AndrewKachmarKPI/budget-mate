package com.budget.mate.mapper;

import com.budget.mate.domain.*;
import com.budget.mate.dto.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.stream.Collectors;

@Component
public class Mapper {
    @Resource
    private BCryptPasswordEncoder passwordEncoder;

    public BankDto bankEntityToDto(BankEntity bankEntity) {
        return BankDto.builder()
                .id(bankEntity.getId())
                .bankId(bankEntity.getBankId())
                .bankName(bankEntity.getBankName())
                .currentAmount(bankEntity.getCurrentAmount())
                .deadline(bankEntity.getDeadline())
                .goal(bankEntity.getGoal())
                .transactions(bankEntity.getTransactions().stream().map(this::transactionEntityToDto).collect(Collectors.toList()))
                .build();
    }

    public TransactionDto transactionEntityToDto(TransactionEntity transaction) {
        return TransactionDto.builder()
                .created(transaction.getCreated())
                .sum(transaction.getSum())
                .cardDto(cardEntityToDto(transaction.getCardEntity()))
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
                    .avatarId(userEntity.getProfileEntity().getAvatar()).build();
        }
        return userDto;
    }

    public FileDto getFileDto(FileEntity fileEntity) {
        return FileDto.builder()
                .fileId(fileEntity.getFileId())
                .category(fileEntity.getCategory())
                .name(fileEntity.getName())
                .type(fileEntity.getType())
                .content(fileEntity.getContent())
                .url(fileEntity.getUrl())
                .size(fileEntity.getSize()).build();
    }

    public String encode(String value) {
        return this.passwordEncoder.encode(value);
    }

    public String username() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}

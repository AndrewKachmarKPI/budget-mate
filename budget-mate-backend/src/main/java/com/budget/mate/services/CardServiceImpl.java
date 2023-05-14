package com.budget.mate.services;

import com.budget.mate.domain.CardEntity;
import com.budget.mate.dto.CardDto;
import com.budget.mate.enums.CardType;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CardServiceImpl implements CardService {
    @Resource
    private Mapper mapper;
    @Resource
    private CardRepository cardRepository;

    private static final String OWNER_USERNAME = "username"; //FIXME replace with username

    @Override
    public CardDto addCard(CardDto cardDto) {
        if (cardRepository.existsByNumber(cardDto.getNumber())) {
            throw new RuntimeException("Card with number " + cardDto.getNumber() + " already exist");
        }
        CardEntity cardEntity = CardEntity.builder()
                .cardId(UUID.randomUUID().toString())
                .number(cardDto.getNumber())
                .holder(OWNER_USERNAME)
                .expirationDate(cardDto.getExpirationDate())
                .secretCode(cardDto.getSecretCode())
                .isPrimary(false)
                .type(getCreditCardType(cardDto.getNumber()))
                .build();
        return mapper.cardEntityToDto(cardRepository.save(cardEntity));
    }

    @Override
    public Boolean removeCardById(String cardId) {
        cardRepository.delete(findByCardId(cardId));
        return true;
    }

    @Override
    public List<CardDto> findAllMyCards() {
        return cardRepository.findAllByHolderOrderByIsPrimaryDesc(OWNER_USERNAME)
                .stream().map(cardEntity -> mapper.cardEntityToDto(cardEntity))
                .collect(Collectors.toList());
    }

    @Override
    public CardDto findCardById(String cardId) {
        return mapper.cardEntityToDto(findByCardId(cardId));
    }

    @Override
    public CardDto updateCard(String cardId, CardDto cardDto) {
        if (cardRepository.existsByNumber(cardDto.getNumber())) {
            throw new RuntimeException("Card with number " + cardDto.getNumber() + " already exist");
        }
        CardEntity cardEntity = findByCardId(cardId);
        cardEntity = cardEntity.toBuilder()
                .number(cardDto.getNumber())
                .secretCode(cardDto.getSecretCode())
                .type(getCreditCardType(cardDto.getNumber()))
                .expirationDate(cardDto.getExpirationDate())
                .build();
        return mapper.cardEntityToDto(cardRepository.save(cardEntity));
    }

    @Override
    @Transactional
    public CardDto selectCardAsPrimary(String cardId) {
        List<CardEntity> myCards = cardRepository.findAllByHolderOrderByIsPrimaryDesc(OWNER_USERNAME)
                .stream()
                .map(cardEntity -> cardEntity.toBuilder().isPrimary(false).build())
                .collect(Collectors.toList());
        cardRepository.saveAll(myCards);

        CardEntity cardEntity = findByCardId(cardId);
        cardEntity = cardEntity.toBuilder()
                .isPrimary(true).build();
        return mapper.cardEntityToDto(cardRepository.save(cardEntity));
    }

    private CardEntity findByCardId(String cardId) {
        return cardRepository.findByCardId(cardId)
                .orElseThrow(() -> new RuntimeException("Card with id " + cardId + " is not found!"));
    }

    public CardType getCreditCardType(String cardNumber) {
        // Visa
        if (cardNumber.matches("^4[0-9]{12}(?:[0-9]{3})?$")) {
            return CardType.VISA;
        }
        // Mastercard
        else if (cardNumber.matches("^5[1-5][0-9]{14}$")) {
            return CardType.MASTERCARD;
        }
        // American Express
        else if (cardNumber.matches("^3[47][0-9]{13}$")) {
            return CardType.AMERICAN_EXPRESS;
        }
        // Discover
        else if (cardNumber.matches("^6(?:011|5[0-9]{2})[0-9]{12}$")) {
            return CardType.DISCOVER;
        }
        // JCB
        else if (cardNumber.matches("^(?:2131|1800|35\\d{3})\\d{11}$")) {
            return CardType.JCB;
        }
        // Diners Club
        else if (cardNumber.matches("^3(?:0[0-5]|[68][0-9])[0-9]{11}$")) {
            return CardType.DINNERS_CLUB;
        }
        // Unknown
        else {
            return CardType.GENERAL;
        }
    }

}

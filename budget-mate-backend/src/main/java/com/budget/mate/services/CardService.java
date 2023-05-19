package com.budget.mate.services;

import com.budget.mate.domain.CardEntity;
import com.budget.mate.dto.CardDto;
import com.budget.mate.dto.CreateCardDto;

import java.util.List;

public interface CardService {
    CardDto addCard(CreateCardDto cardDto);

    Boolean removeCardById(String cardId);

    List<CardDto> findAllMyCards();

    CardDto findCardById(String cardId);

    CardDto updateCard(String cardId, CardDto cardDto);

    CardDto selectCardAsPrimary(String cardId);

    CardEntity findCardEntityById(String cardId);
}

package com.budget.mate.services;

import com.budget.mate.dto.CardDto;

import java.util.List;

public interface CardService {
    CardDto addCard(CardDto cardDto);

    Boolean removeCardById(String cardId);

    List<CardDto> findAllMyCards();

    CardDto findCardById(String cardId);

    CardDto updateCard(String cardId, CardDto cardDto);

    CardDto selectCardAsPrimary(String cardId);
}

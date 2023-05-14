package com.budget.mate.repositories;

import com.budget.mate.domain.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {
    Boolean existsByNumber(String number);

    Optional<CardEntity> findByCardId(String cardId);
    List<CardEntity> findAllByHolderOrderByIsPrimaryDesc(String holder);
}

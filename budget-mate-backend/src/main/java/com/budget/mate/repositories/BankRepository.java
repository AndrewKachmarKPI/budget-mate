package com.budget.mate.repositories;

import com.budget.mate.domain.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<BankEntity, Long> {
    Optional<BankEntity> findByBankName(String name);

    Optional<BankEntity> findByBankId(String bankId);

    Boolean existsByBankNameAndOwnerUsername(String bankName, String owner);
    List<BankEntity> findAllByOwnerUsernameOrderByDeadlineDesc(String owner);
}

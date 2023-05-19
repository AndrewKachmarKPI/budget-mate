package com.budget.mate.dto;

import com.budget.mate.enums.CardType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDto {
    private String cardId;

    private String number;
    private String name;

    private String holderName;

    private String expirationDate;

    private String secretCode;

    private String type;
}

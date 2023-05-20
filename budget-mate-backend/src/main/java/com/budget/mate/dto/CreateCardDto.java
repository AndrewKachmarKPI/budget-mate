package com.budget.mate.dto;

import lombok.*;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCardDto {
    private String number;
    private String name;
    private String expDate;
    private String secretCode;
}

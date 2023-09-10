package com.budget.mate.dto;

import lombok.*;

import javax.validation.constraints.*;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCardDto {
    @NotNull
    @Pattern(regexp = "^\\d{16}$")
    private String number;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    @Pattern(regexp = "^\\d{2}/\\d{2}$")
    private String expDate;

    @NotNull
    @Size(min = 3, max = 4)
    private String secretCode;
}

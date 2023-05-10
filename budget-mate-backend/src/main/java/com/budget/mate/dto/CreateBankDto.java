package com.budget.mate.dto;


import lombok.*;

import javax.validation.constraints.*;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateBankDto {
    @NotNull
    @NotEmpty
    @NotBlank
    @Size(min = 2)
    private String title;
    @NotNull
    @Min(10)
    private Double goal;
    @NotNull
    private String deadline;
}

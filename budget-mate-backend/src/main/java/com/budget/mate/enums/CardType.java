package com.budget.mate.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CardType {
    VISA("Visa"),
    MASTERCARD("Mastercard"),
    AMERICAN_EXPRESS("American Express"),
    DISCOVER("Discover"),
    JCB("JCB"),
    DINNERS_CLUB("Diners Club"),
    GENERAL("Credit card");


    private String name;
}

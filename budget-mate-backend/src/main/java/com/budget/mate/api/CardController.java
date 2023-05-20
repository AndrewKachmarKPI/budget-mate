package com.budget.mate.api;

import com.budget.mate.dto.CardDto;
import com.budget.mate.dto.CreateCardDto;
import com.budget.mate.services.CardService;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cards")
public class CardController {
    @Resource
    private CardService cardService;

    @PostMapping
    public ResponseEntity<CardDto> addCard(@RequestBody CreateCardDto cardDto) {
        return ResponseEntity.ok(cardService.addCard(cardDto));
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Boolean> removeCardById(@PathVariable("cardId") @NotNull @NotEmpty @NotBlank String cardId) {
        return ResponseEntity.ok(cardService.removeCardById(cardId));
    }

    @GetMapping
    public ResponseEntity<List<CardDto>> findAllMyCards() {
        return ResponseEntity.ok(cardService.findAllMyCards());
    }

    @GetMapping("/{cardId}")
    public ResponseEntity<CardDto> getBankById(@PathVariable("cardId") @NotNull @NotEmpty @NotBlank String cardId) {
        return ResponseEntity.ok(cardService.findCardById(cardId));
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<CardDto> updateCard(@PathVariable("cardId") @NotNull @NotEmpty @NotBlank String cardId,
                                              @RequestBody CardDto cardDto) {
        return ResponseEntity.ok(cardService.updateCard(cardId, cardDto));
    }

    @PutMapping("/primary/{cardId}")
    public ResponseEntity<CardDto> selectCardAsPrimary(@PathVariable("cardId") @NotNull @NotEmpty @NotBlank String cardId) {
        return ResponseEntity.ok(cardService.selectCardAsPrimary(cardId));
    }
}

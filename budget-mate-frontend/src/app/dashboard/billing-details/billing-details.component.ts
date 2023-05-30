import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Cleave from "cleave.js";
import 'cleave.js/dist/addons/cleave-phone.i18n';
import {CardDto} from "../../models/card-dto";
import {CardService} from "../../_services/card.service";
import {ToastrService} from "ngx-toastr";
import {CreateCardDto} from "../../models/create-card-dto";
import {UserService} from "../services/user.service";
import {BillingPlan} from "../../auth/models/billing-plan";

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})

export class BillingDetailsComponent implements OnInit {


  public mockInvoices: any = [
    {
      code: '1XBDAS1',
      amount: 14,
      plan: 'Plan1',
      invoiceDate: '11.05.2023',
      datePaid: '12.05.23',
      status: 'Active',
      paymentMethod: 'karta1',
      invoiceNumber: 1234
    },
    {
      code: '1XBDAS2',
      amount: 14,
      plan: 'Plan2',
      invoiceDate: '11.05.2023',
      datePaid: '12.05.23',
      status: 'Completed',
      paymentMethod: 'karta2',
      invoiceNumber: 1234
    },
    {
      code: '1XBDAS3',
      amount: 35,
      plan: 'Plan3',
      invoiceDate: '11.05.2023',
      datePaid: '12.05.23',
      status: 'Scheduled',
      paymentMethod: 'karta3',
      invoiceNumber: 1234
    },
    {
      code: '1XBDAS4',
      amount: 14,
      plan: 'Plan4',
      invoiceDate: '11.05.2023',
      datePaid: '12.05.23',
      status: 'Pending',
      paymentMethod: 'karta4',
      invoiceNumber: 1234
    },
  ];
  public cards: CardDto[] = [];
  public billingPlan: BillingPlan = BillingPlan.BASIC;
  public mockStatusesAndClasses = new Map<string, String>([
    ["Completed", 'badge bg-label-success me-1'],
    ["Active", 'badge bg-label-primary me-1'],
    ["Scheduled", 'badge bg-label-info me-1'],
    ["Pending", 'badge bg-label-warning me-1']
  ]);
  public cardFormGroup = new FormGroup({
    ownerName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(16)])),
    expiration: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    cvv: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
  });
  public tempCard;

  constructor(private elementRef: ElementRef,
              private cardService: CardService,
              private userService: UserService,
              private toastrService: ToastrService) {
    this.fetchMyCards();
  }

  private fetchMyCards() {
    this.cardService.findAllMyCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: () => {
        this.toastrService.error("Oops! Couldn't retrieve cards information...");
      }
    });
  }

  ngOnInit(): void {
    this.userService.currentPlan.subscribe({
      next: (plan) => {
        if (plan) this.billingPlan = plan;
      }
    });
  }

  saveCard(): void {
    const newCard = new CreateCardDto(
      this.cardFormGroup.value.number.replace(/\s/g, ""),
      this.cardFormGroup.value.ownerName,
      this.cardFormGroup.value.expiration,
      this.cardFormGroup.value.cvv,
    )
    this.cardService.addCard(newCard).subscribe({
      next: (card) => {
        this.cardFormGroup.reset()
        this.toastrService.success("Card successfully saved!");
        this.cards.push(card);
      },
      error: () => {
        this.toastrService.error("Oops! Couldn't add new card");
      }
    })
  }

  saveCardChanges(card: CardDto) {
    card.number = this.cardFormGroup.value.number.replace(/\s/g, "")
    card.name = this.cardFormGroup.value.ownerName
    card.expirationDate = this.cardFormGroup.value.expiration
    card.secretCode = this.cardFormGroup.value.cvv
    card.type = this.determineCardType(this.cardFormGroup.value.number.replace(/\s/g, ""))

    this.cardService.updateCardById(card.cardId, card).subscribe({
      next: (card) => {
        const index = this.cards.indexOf(this.cards.find(value => value.cardId == card.cardId));
        this.cards[index] = card;
        this.cardFormGroup.reset()
        this.toastrService.success("Card successfully edited!");
      },
      error: () => {
        this.toastrService.error("Oops! Save card changes");
      }
    })
  }

  loadCardDataToFormGroup(card: CardDto) {
    this.cardFormGroup.patchValue({
      number: this.formatCreditCardNumber(card.number),
      ownerName: card.name,
      expiration: card.expirationDate,
      cvv: card.secretCode
    })
    this.tempCard = card;
  }

  determineCardType(cardNumber: string): string {
    const cleanedNumber = cardNumber.replace(/\D/g, '');
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
    };
    for (const cardType in cardPatterns) {
      if (cardPatterns[cardType].test(cleanedNumber)) {
        return cardType;
      }
    }
    return 'Unknown';
  }

  closeCardModal() {
    this.cardFormGroup.reset()
  }

  deleteCard(cardDto: CardDto) {
    this.cardService.removeCardById(cardDto.cardId).subscribe({
      next: (isRemoved) => {
        if (isRemoved) {
          this.cards.splice(this.cards.indexOf(cardDto), 1);
          this.toastrService.success("Card successfully removed!");
        }
      },
      error: () => {
        this.toastrService.error("Oops! Something went wrong");
      }
    })
  }

  formatCreditCardNumber(cardNumber: string): string {
    const pattern = '9999 9999 9999 9999';
    if (pattern) {
      const formattedNumber = cardNumber.replace(/\D/g, '');
      let formattedString = '';
      let j = 0;
      for (let i = 0; i < formattedNumber.length; i++) {
        if (j < pattern.length && pattern.charAt(j) === '9') {
          formattedString += formattedNumber.charAt(i);
          j++;
        } else {
          formattedString += ' ' + formattedNumber.charAt(i);
          j = formattedString.length;
        }
      }
      return formattedString.trim();
    }
    return cardNumber;
  }

  public getBillingPlanColor() {
    if (this.billingPlan == BillingPlan.BASIC) return "bg-label-warning";
    if (this.billingPlan == BillingPlan.PREMIUM) return "bg-label-primary";
    if (this.billingPlan == BillingPlan.PRO) return "bg-label-info";
    return "";
  }
}

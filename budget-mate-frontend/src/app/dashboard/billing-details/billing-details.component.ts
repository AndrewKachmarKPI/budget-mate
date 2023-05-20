import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ElementRef } from '@angular/core';
import Cleave from "cleave.js";
import 'cleave.js/dist/addons/cleave-phone.i18n';
import {CardDto} from "../../models/card-dto";
import {CardService} from "../../_services/card.service";
import {ToastrService} from "ngx-toastr";
import {CreateCardDto} from "../../models/create-card-dto";

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})

export class BillingDetailsComponent implements OnInit {


  invoices: any = [
    { code:'1XBDAS1',amount: 9,plan: 'Plan1',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Active',paymentMethod:'karta1',invoiceNumber:1234},
    { code:'1XBDAS2',amount: 169,plan: 'Plan2',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Completed',paymentMethod:'karta2',invoiceNumber:1234},
    { code:'1XBDAS3',amount: 169,plan: 'Plan3',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Scheduled',paymentMethod:'karta3',invoiceNumber:1234},
    { code:'1XBDAS4',amount: 99,plan: 'Plan4',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Pending',paymentMethod:'karta4',invoiceNumber:1234},
  ];

  /*public cards:any=[
    {type:"mastercard",ownerName:"Tom McBride", expiration:"12/26", number:"4716313599689856",cvv:"133",isPrimary:true},
    {type:"visa",ownerName:"Mildred Melnyk", expiration:"12/26", number:"5525132581415896",cvv:"144",isPrimary:false},
  ]*/
  public cards:CardDto[];
  public statusesAndClasses = new Map<string, String>([
    ["Completed", 'badge bg-label-success me-1'],
    ["Active",'badge bg-label-primary me-1'],
    ["Scheduled", 'badge bg-label-info me-1'],
    ["Pending", 'badge bg-label-warning me-1']
  ]);
  public cardFormGroup = new FormGroup({
    ownerName: new FormControl('', Validators.compose([Validators.required,Validators.minLength(4)])),
    number: new FormControl('', Validators.compose([Validators.required,Validators.minLength(16)])),
    expiration: new FormControl('', Validators.compose([Validators.required,Validators.minLength(5)])),
    cvv: new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
  });
  constructor(private elementRef: ElementRef,
              private cardService:CardService,
              private toastrService:ToastrService) {
    cardService.findAllMyCards().subscribe(
      (data: CardDto[]) => {
        this.cards = data;
      },
      (error: any) => {
          this.toastrService.error("Oops! Couldn't retrieve cards information...");
      }
    );

  }


  ngOnInit(): void {
    const n=document.getElementById("modalAddCard");
    const a = document.getElementById("modalAddCardExpiryDate");
    const o = document.getElementById("modalAddCardCvv");
    const name= document.getElementById("modalAddCardName");
    const nEdit=document.getElementById("modalEditCard");
    const aEdit = document.getElementById("modalEditCardExpiryDate");
    const oEdit = document.getElementById("modalEditCardCvv");
    const nameEdit= document.getElementById("modalEditCardName");

    if(n){
      new Cleave(n,{
        creditCard: !0
      });
    }
    if(nEdit){
      new Cleave(nEdit,{
        creditCard: !0
      });
    }
    if (a) {
      new Cleave(a, {
        date: true,
        delimiter: '/',
        datePattern: ['m', 'y']
      });
    }
    if(name){
      new Cleave(name, {
        delimiter: '',
        numericOnly: false,
        uppercase: true,
        blocks: [
          { // Only allow letters and spaces
            pattern: /^[A-Za-z\s]+$/,
          }
        ]
      });
    }
    if (aEdit) {
      new Cleave(aEdit, {
        date: true,
        delimiter: '/',
        datePattern: ['m', 'y']
      });
    }

    if (o) {
      new Cleave(o, {
        numeral: true,
        numeralPositiveOnly: true
      });
    }
    if (oEdit) {
      new Cleave(oEdit, {
        numeral: true,
        numeralPositiveOnly: true
      });
    }
  }
  if(name){
    new Cleave(name, {
      delimiter: '',
      numericOnly: false,
      uppercase: true,
      blocks: [
        { // Only allow letters and spaces
          pattern: /^[A-Za-z\s]+$/,
        }
      ]
    });
  }
  public tempCard;
  saveCard():void {


    var newCard= new CreateCardDto(
      this.cardFormGroup.value.number.replace(/\s/g, ""),
      this.cardFormGroup.value.ownerName,
      this.cardFormGroup.value.expiration,
      this.cardFormGroup.value.cvv,
    )

    this.cardService.addCard(newCard).subscribe({
      next: (bank) => {
        this.cardFormGroup.reset()
        this.toastrService.success("Card successfully saved!");
        this.cards.push(newCard);
      },
      error:()=>{
        this.toastrService.error("Oops! Couldn't add new card");
      }
    })
  }
  saveCardChanges(card:CardDto){

    card.number=this.cardFormGroup.value.number.replace(/\s/g, "")
    card.holderName= this.cardFormGroup.value.ownerName
    card.expirationDate= this.cardFormGroup.value.expiration
    card.secretCode= this.cardFormGroup.value.cvv
    card.type = this.determineCardType(this.cardFormGroup.value.number.replace(/\s/g, ""))

    this.cardService.updateCardById(card.cardId,card).subscribe({
      next: (bank) => {
        this.cardFormGroup.reset()
        this.toastrService.success("Card successfully edited!");
      },
      error:()=>{
        this.toastrService.error("Oops! Save card changes");
      }
    })
  }
  loadCardDataToFormGroup(card:CardDto){
    this.cardFormGroup.patchValue({
      //щось цей клів не хоче апдейтити автоматом по загрузці, отож костиль
      number: this.formatCreditCardNumber(card.number),
      ownerName: card.holderName,
      expiration: card.expirationDate,
      cvv: card.secretCode
    })
    this.tempCard=card;
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
  closeCardModal(){
    this.cardFormGroup.reset()
  }
  deleteCard(cardDto:CardDto){
    this.cardService.removeCardById(cardDto.cardId).subscribe({
      next: (bank) => {
        this.toastrService.success("Card successfully removed!");
        //this.cards.pop(cardDto) ?
      },
      error:()=>{
        this.toastrService.error("Oops! Something went wrong");
      }
    })
  }
  formatCreditCardNumber(cardNumber: string): string {
    //formats my digit sequence in a manner that this cleave would format
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

}

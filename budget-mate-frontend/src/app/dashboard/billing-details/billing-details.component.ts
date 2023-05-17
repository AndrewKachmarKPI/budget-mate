import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ElementRef } from '@angular/core';

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

  cards:any=[
    {type:"mastercard",ownerName:"Tom McBride", expiration:"12/26", number:"4716313599689856",cvv:"133",isPrimary:true},
    {type:"visa",ownerName:"Mildred Melnyk", expiration:"12/26", number:"5525132581415896",cvv:"144",isPrimary:false},
  ]

   public statusesAndClasses = new Map<string, String>([
    ["Completed", 'badge bg-label-success me-1'],
     ["Active",'badge bg-label-primary me-1'],
     ["Scheduled", 'badge bg-label-info me-1'],
     ["Pending", 'badge bg-label-warning me-1']
   ]);
  public cardFormGroup = new FormGroup({
    ownerName: new FormControl('', Validators.compose([Validators.required])),
    number: new FormControl('', Validators.compose([Validators.required])),
    expiration: new FormControl('', Validators.compose([Validators.required])),
    cvv: new FormControl('', Validators.compose([Validators.required])),
  });
  constructor(private elementRef: ElementRef) { }


  ngOnInit(): void {
  }
  saveCard():void{
    console.log("dodav kartu")
    console.log(this.cardFormGroup)
    var tempData={type:"",ownerName:"",number:"",expiration:"",cvv:"",isPrimary:false};
    tempData.type=this.determineCardType(this.cardFormGroup.value.number)
    tempData.ownerName=this.cardFormGroup.value.ownerName
    tempData.number=this.cardFormGroup.value.number
    tempData.expiration=this.cardFormGroup.value.expiration
    tempData.cvv=this.cardFormGroup.value.cvv
    //treba she podumati yak handleti primarity of cards
    //tempData.isPrimary=false
    this.cardFormGroup.reset()
    //tipa she v bd shletsia
    this.cards.push(tempData)
  }
   determineCardType(cardNumber: string): string {
    // Remove any non-digit characters from the card number
    const cleanedNumber = cardNumber.replace(/\D/g, '');

    // Define regular expressions for different card types
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
    };

    // Check the card number against the defined patterns
    for (const cardType in cardPatterns) {
      if (cardPatterns[cardType].test(cleanedNumber)) {
        console.log(cardType)
        return cardType;
      }
    }
    return 'Unknown';
  }
  closeCardModal(){
    this.cardFormGroup.reset()
  }
}


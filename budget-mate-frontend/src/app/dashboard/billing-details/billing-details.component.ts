import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {

  invoices: any = [
    { code:'1XBDAS1',amount: 2000,plan: 'Plan1',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Active',paymentMethod:'karta1',invoiceNumber:1234},
    { code:'1XBDAS2',amount: 2000,plan: 'Plan2',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Completed',paymentMethod:'karta2',invoiceNumber:1234},
    { code:'1XBDAS3',amount: 2000,plan: 'Plan3',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Scheduled',paymentMethod:'karta3',invoiceNumber:1234},
    { code:'1XBDAS4',amount: 2000,plan: 'Plan4',invoiceDate:'11.05.2023',datePaid:'12.05.23',status:'Pending',paymentMethod:'karta4',invoiceNumber:1234},
  ];

  // Create an empty dictionary
   public statusesAndClasses = new Map<string, String>([
    ["Completed", 'badge bg-label-success me-1'],
     ["Active",'badge bg-label-primary me-1'],
     ["Scheduled", 'badge bg-label-info me-1'],
     ["Pending", 'badge bg-label-warning me-1']
   ]);

  constructor() { }


  ngOnInit(): void {
    this.invoices.forEach((_invoice) => {
      _invoice.isExpanded = true;
    });
  }

}

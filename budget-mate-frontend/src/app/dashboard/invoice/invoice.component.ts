import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public code:string
  ngOnInit(): void {
    this.code=this.route.snapshot.params['code']
  }

}

import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Congratulations', 'YOU ARE GAY',{
      //fisting is 300 bucks
      timeOut: 5000,
    });

  }
}

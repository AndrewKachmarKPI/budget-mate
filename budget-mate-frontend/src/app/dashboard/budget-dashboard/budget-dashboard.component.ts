import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit {
  public budgets: any[] = [];

  public formGroup: FormGroup = new FormGroup<any>({
    bankTitleControl: new FormControl("", Validators.compose([
      Validators.required, Validators.minLength(2)
    ])),
    goalControl: new FormControl("", Validators.compose([
      Validators.required, Validators.min(5)
    ])),
    deadlineControl: new FormControl("", Validators.compose([
      Validators.required
    ])),
  });

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Congratulations', 'YOU ARE GAY', {
      //fisting is 300 bucks
      timeOut: 5000,
    });

  }
}

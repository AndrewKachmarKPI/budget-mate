import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateBudgetDto} from "../../auth/models/create-budget-dto";
import flatpickr from "flatpickr";
import {BudgetDto} from "../../auth/models/budget-dto";
import {BudgetService} from "../services/budget.service";

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit, AfterViewInit {
  public budgets: BudgetDto[] = [];

  public formGroup: FormGroup = new FormGroup<any>({
    name: new FormControl("", Validators.compose([
      Validators.required, Validators.minLength(2)
    ])),
    budget: new FormControl("", Validators.compose([
      Validators.required, Validators.min(2)
    ])),
    category: new FormControl("", Validators.compose([
      Validators.required, Validators.min(5)
    ])),
    deadline: new FormControl("", Validators.compose([
      Validators.required
    ])),
  });

  constructor(private toastr: ToastrService,
              private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.getMyBudgets();
  }


  get controls() {
    return this.formGroup.controls;
  }

  public resetForm() {
    this.formGroup.reset();
  }

  public createBudget(close: HTMLButtonElement) {
    if (this.formGroup.valid) {
      const dto: CreateBudgetDto = {
        name: this.controls['name'].value,
        budget: this.controls['budget'].value,
        category: this.controls['category'].value,
        deadline: this.controls['deadline'].value
      };
      this.budgetService.createBudget(dto).subscribe({
        next: (budget) => {
          this.budgets.push(budget);
          close.click();
          this.toastr.success("Budget created");
        },
        error: () => {
          this.toastr.error("Failed to create budget");
        }
      })
    }
  }

  public getMyBudgets() {
    this.budgetService.getAllBudgets().subscribe({
      next: (budgets) => {
        this.budgets = budgets;
      }
    })
  }

  ngAfterViewInit(): void {
    this.initDataPicker();
  }

  public initDataPicker() {
    let element = document.getElementById("deadline");
    flatpickr(element, {
      minDate: new Date().setDate(new Date().getDate() + 5)
    });
  }

  public getDays(deadline: string) {
    return this.getDateDifference(new Date(), new Date(deadline))
  }

  public getBudgetPersent(budget: BudgetDto) {
    const percent = (budget.expenses * 100) / budget.budget;
    return Math.round(percent);
  }

  public getDateDifference(startDate: Date, endDate: Date): number {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}

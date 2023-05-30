import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";
import {BudgetService} from "../../_services/budget.service";
import {BudgetDto} from "../../auth/models/budget-dto";
import {CardDto} from "../../models/card-dto";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TransactionDto} from "../../models/transaction-dto";
import {CardService} from "../../_services/card.service";
import {ExpensesCategoryDto} from "../../auth/models/expenses-category-dto";

interface Category {
  icon: string;
  name: string;
}

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit, OnChanges {
  public categories: ExpensesCategoryDto[];
  private expenses: TransactionDto[] = []
  public expenseFormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    amount: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')])),
    card: new FormControl('', Validators.compose([Validators.required])),
    categoryName: new FormControl('', Validators.compose([Validators.required]))
  });
  public categoryFormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    icon: new FormControl('', Validators.compose([Validators.required])),
  });

  @Input() selectedCategory = "None";
  public expensesView: TransactionDto[];
  public totalExpenses = 0;
  @ViewChild("pieChart") pieChart: ChartComponent;
  @ViewChild("barChart") barChart: ChartComponent;

  public pieChartOptions: Partial<PieChartOptions>;
  public barChartOptions: Partial<BarChartOptions>;
  public budget: BudgetDto;
  public cards: CardDto[];
  public id: string;

  constructor(private budgetService: BudgetService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private cardService: CardService) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cardService.findAllMyCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: () => {
        this.toastrService.error("Oops! Couldn't retrieve cards information...");
      }
    });
    this.updateBudget();
    this.categoryFilterSelected("None")
  }

  public updateBudget() {
    this.budgetService.findBudgetById(this.id).subscribe(
      (data: BudgetDto) => {
        this.budget = data;

        this.expenses = this.budget.transactions;
        this.expensesView = this.expenses;
        this.totalExpenses = this.expenses.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.sum;
        }, 0);
        this.categories = this.expenses.reduce((uniqueArray: ExpensesCategoryDto[], trans: TransactionDto) => {
          if (!uniqueArray.some((p) => p.name === trans.category.name)) {
            uniqueArray.push(trans.category);
          }
          return uniqueArray;
        }, []);
        this.preparePiChartData()
        this.prepareBarChartData()
      },
      (error: any) => {
        this.toastrService.error("Oops! Couldn't retrieve budget information...");
      });
    this.expensesView = this.expenses;
    this.totalExpenses = this.expenses.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.sum;
    }, 0);
    this.categories = this.expenses.reduce((uniqueArray: ExpensesCategoryDto[], trans: TransactionDto) => {
      if (!uniqueArray.some((p) => p.name === trans.category.name)) {
        uniqueArray.push(trans.category);
      }
      return uniqueArray;
    }, []);
  }

  public getCardType(card: CardDto) {
    if (card.type == "Visa") return "fa-cc-visa";
    if (card.type == "Mastercard") return "fa-cc-mastercard";
    if (card.type == "American Express") return "fa-cc-amex";
    if (card.type == "Discover") return "fa-cc-discover";
    return "fa-credit-card";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.categoryFilterSelected(this.selectedCategory);
    }
  }

  categoryFilterSelected(categoryName: string) {
    if (categoryName === "None") {
      this.expensesView = this.expenses;
      return
    }
    this.expensesView = this.expenses
      .filter(item => item.category.name === categoryName);
  }

  saveExpense() {
    let temp: TransactionDto;
    this.budgetService.createTransaction(
      this.id,
      parseInt(this.expenseFormGroup.value.amount),
      this.expenseFormGroup.value.categoryName,
      this.expenseFormGroup.value.card).subscribe({
      next: (data: TransactionDto) => {
        temp = data;
        this.expenses.push(temp);
        this.categoryFilterSelected(this.selectedCategory);
        this.updateBudget();
      },
      error: () => {
        this.toastrService.error("Oops! Couldn't save the expense...");
      }
    })

    this.clearExpenseForm()
  }

  clearExpenseForm() {
    this.expenseFormGroup.reset()
  }

  clearCategoryForm() {
    this.categoryFormGroup.reset()
  }

  preparePiChartData() {
    let categoriesAndSums = this.expenses.reduce((result, item) => {
      const {category, sum} = item;
      if (!result[category.name]) {
        result[category.name] = {category, sum: 0};
      }
      result[category.name].sum += sum;
      return result;
    }, {});
    this.pieChartOptions = {
      series: Object.values(categoriesAndSums).map(({sum}) => sum),
      chart: {
        width: 480,
        type: "pie",
      },
      labels: Object.values(categoriesAndSums).map(({category}) => category.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };
  }

  prepareBarChartData() {
    const categoriesAndSumsTwo: { [key: string]: { category: Category; sum: number } } = this.expenses.reduce((result, item) => {
      const {category, sum} = item;
      if (!result[category.name]) {
        result[category.name] = {category, sum: 0};
      }
      result[category.name].sum += sum;
      return result;
    }, {});

    let topFiveCategories = Object.values(categoriesAndSumsTwo)
      .sort((a, b) => b.sum - a.sum)
      .slice(0, 5)
      .map(({category, sum}) => ({category: category, sum}));
    console.log(Object.values(topFiveCategories).map(({category}) => category.name))
    this.barChartOptions = {
      series: [{data: Object.values(topFiveCategories).map(({sum}) => sum)}],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: Object.values(topFiveCategories)
          .map(({category}) => category.name)
      }
    };
  }

  calculateDaysBetweenDeadlineAndToday(deadline: string): number {
    const date1 = new Date();
    let deadlineDate = new Date(deadline)
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const timeDifference = Math.abs(deadlineDate.getTime() - date1.getTime());
    return Math.round(timeDifference / oneDayInMilliseconds);
  }

  saveCategory() {
    this.budgetService.createCategory(this.categoryFormGroup.value.name, this.categoryFormGroup.value.icon).subscribe({
      next: (data: ExpensesCategoryDto) => {
        this.categories.push(data)
      },
      error: () => {
        this.toastrService.error("Oops! Couldn't save categories information...");
      }
    });
    console.log(this.categories)
  }

}

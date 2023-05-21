import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Cleave from "cleave.js";
import {ChartComponent} from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
//import {BudgetService} from "../../_services/budget.service";
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

  @Input()
  public selectedCategory = "None";
  public expensesView: TransactionDto[];
  public totalExpenses = 0;
  @ViewChild("pieChart") pieChart: ChartComponent;
  @ViewChild("barChart") barChart: ChartComponent;

  public pieChartOptions: Partial<PieChartOptions>;
  public barChartOptions: Partial<BarChartOptions>;
  public budget: BudgetDto;
  public cards: CardDto[];

  constructor(/*private budgetService: BudgetService,*/
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              /*private cardService: CardService*/) {
  }

  public id: string;
  public icons=[
    "bx bx-heart",
    "bx bx-alarm",
    "bx bx-dollar"
  ]
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    /*this.cardService.findAllMyCards().subscribe(
      (data: CardDto[]) => {
        this.cards = data;
      },
      (error: any) => {
        this.toastrService.error("Oops! Couldn't retrieve cards information...");
      })*/
    this.cards=[
      new CardDto("0",
                  "4326985694683880",
                  "Khiliy",
                  "Visa",
                  "02/27",
                  "531"),
      new CardDto("1",
        "5430122998547682",
        "Andrew",
        "Mastercard",
        "02/28",
        "532"),]

    /*this.budgetService.findBudgetById(this.id).subscribe(
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
      });*/
    this.budget=new BudgetDto(
      "0",
      "Test1",
      "Somebody",
      5000,
      1000,
      "2023-08-23",
      "2023-05-21",
      "TestCategory",
      [new TransactionDto("2023-08-23",500,new CardDto("1",
        "5430122998547682",
        "Andrew",
        "Mastercard",
        "02/28",
        "532"),
        new ExpensesCategoryDto("0","Gachi","bx bx-heart bx-xs","2023-05-21")),
        new TransactionDto("2023-08-22",500,new CardDto("1",
            "4326985694683880",
            "Khiliy",
            "Visa",
            "03/28",
            "533"),
          new ExpensesCategoryDto("0","Entertainment","bx bx-pie-chart-alt bx-xs","2023-05-21"))])
    this.expenses = [new TransactionDto("2023-08-23",500,new CardDto("1",
        "5430122998547682",
        "Andrew",
        "Mastercard",
        "02/28",
        "532"),
      new ExpensesCategoryDto("0","Gachi","bx bx-heart bx-xs","2023-05-21")),
      new TransactionDto("2023-08-22",500,new CardDto("1",
          "4326985694683880",
          "Khiliy",
          "Visa",
          "03/28",
          "533"),
        new ExpensesCategoryDto("0","Entertainment","bx bx-pie-chart-alt bx-xs","2023-05-21"))]
    this.expensesView = this.expenses;
    this.categories=[new ExpensesCategoryDto("0","Entertainment","bx bx-pie-chart-alt bx-xs","2023-05-21"),
      new ExpensesCategoryDto("0","Gachi","bx bx-heart bx-xs","2023-05-21")]
    this.totalExpenses = this.expenses.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.sum;
    }, 0);
    this.categories = this.expenses.reduce((uniqueArray: ExpensesCategoryDto[], trans: TransactionDto) => {
      if (!uniqueArray.some((p) => p.name === trans.category.name)) {
        uniqueArray.push(trans.category);
      }
      return uniqueArray;
    }, []);
    console.log(this.categories)
    console.log(this.expenses)
    console.log(this.expensesView)

    this.categoryFilterSelected("None")
    const n = document.getElementById("addAmount");
    if (n) {
      new Cleave(n, {
        numeral: true
      });
    }
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
    var temp: TransactionDto;
    /*this.budgetService.createTransaction(
      this.id,
      parseInt(this.expenseFormGroup.value.amount),
      this.expenseFormGroup.value.categoryName,
      this.expenseFormGroup.value.card).subscribe(
      (data: TransactionDto) => {
        temp = data;
        this.expenses.push(temp)
        this.categoryFilterSelected(this.selectedCategory)
      },
      (error: any) => {
        this.toastrService.error("Oops! Couldn't save the expense...");
      })*/

    this.clearExpenseForm()
  }

  clearExpenseForm() {
    this.expenseFormGroup.reset()
  }

  clearCategoryForm() {
    this.categoryFormGroup.reset()
  }

  preparePiChartData() {
    var categoriesAndSums = this.expenses.reduce((result, item) => {
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

    var topFiveCategories = Object.values(categoriesAndSumsTwo)
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
    var deadlineDate = new Date(deadline)
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const timeDifference = Math.abs(deadlineDate.getTime() - date1.getTime()); // Calculate the time difference in milliseconds
    const daysDifference = Math.round(timeDifference / oneDayInMilliseconds); // Convert the time difference to days

    return daysDifference;
  }
  saveCategory(){
    const tempCat=new ExpensesCategoryDto("0",this.categoryFormGroup.value.name,this.categoryFormGroup.value.icon,new Date().toString())
    this.categories.push(tempCat)
    console.log(this.categories)
  }

}

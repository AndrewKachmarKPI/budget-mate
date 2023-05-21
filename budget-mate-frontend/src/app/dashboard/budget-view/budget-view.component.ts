import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
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
  public categories = [{icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"},
    {icon: "bx bx-heart bx-xs", name: "Gachi"}]
  private expenses = [
    {
      name: "Kek1",
      amount: 500,
      date: "2023-05-12",
      category: {icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"}
    },
    {name: "Kek2", amount: 300, date: "2023-05-11", category: {icon: "bx bx-heart bx-xs", name: "Gachi"}},
    {
      name: "Kek3",
      amount: 200,
      date: "2023-05-10",
      category: {icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"}
    },
    {
      name: "Kek4",
      amount: 200,
      date: "2023-05-09",
      category: {icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"}
    },
    {
      name: "Kek5",
      amount: 200,
      date: "2023-05-08",
      category: {icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"}
    },
    {
      name: "Kek6",
      amount: 200,
      date: "2023-05-07",
      category: {icon: "bx bx-pie-chart-alt bx-xs", name: "Entertainment"}
    },
  ]
  public expenseFormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    amount: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')])),
    date: new FormControl('', Validators.compose([Validators.required])),
    categoryName: new FormControl('', Validators.compose([Validators.required]))
  });
  public categoryFormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    icon: new FormControl('', Validators.compose([Validators.required])),
  });

  @Input()
  public selectedCategory = "None";
  public expensesView = this.expenses;
  public budget = 5000;
  public totalExpenses = this.expenses.reduce((accumulator, currentItem) => {
    if (currentItem.amount > 5) {
      return accumulator + currentItem.amount;
    }
    return accumulator;
  }, 0);
  @ViewChild("pieChart") pieChart: ChartComponent;
  @ViewChild("barChart") barChart: ChartComponent;

  public pieChartOptions: Partial<PieChartOptions>;
  public barChartOptions: Partial<BarChartOptions>;

  constructor() {
    var categoriesAndSums = this.expenses.reduce((result, item) => {
      const {category, amount} = item;
      if (!result[category.name]) {
        result[category.name] = {category, sum: 0};
      }
      result[category.name].sum += amount;
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


    const categoriesAndSumsTwo: { [key: string]: { category: Category; sum: number } } = this.expenses.reduce((result, item) => {
      const {category, amount} = item;
      if (!result[category.name]) {
        result[category.name] = {category, sum: 0};
      }
      result[category.name].sum += amount;
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

  ngOnInit(): void {
    const n = document.getElementById("addAmount");

    if (n) {
      new Cleave(n, {
        numeral: true
      });
    }
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
    this.expensesView = this.expenses.filter(item => item.category.name === categoryName);
  }

  saveExpense() {
    var tempExpense = {
      name: this.expenseFormGroup.value.name,
      amount: parseInt(this.expenseFormGroup.value.amount),
      date: this.expenseFormGroup.value.date,
      category: this.categories.find(item => item.name === this.expenseFormGroup.value.categoryName)
    }
    this.expenses.push(tempExpense)
    console.log(this.expenses)
    this.clearExpenseForm()
  }

  clearExpenseForm() {
    this.expenseFormGroup.reset()
  }

  clearCategoryForm() {
    this.categoryFormGroup.reset()
  }
}

import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import flatpickr from "flatpickr";
import {ToastrService} from "ngx-toastr";
import {CreateBankDto} from "../../models/create-bank-dto";
import {BankDto} from "../../models/bank-dto";
import {CardDto} from "../../models/card-dto";
import {BankService} from "../services/bank.service";
import {CardService} from "../services/card.service";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-savings-dashboard',
  templateUrl: './savings-dashboard.component.html',
  styleUrls: ['./savings-dashboard.component.css']
})
export class SavingsDashboardComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("closeForm") closeForm: HTMLButtonElement;

  public chartsOptions: Map<BankDto, Partial<ChartOptions>> = new Map<BankDto, Partial<ChartOptions>>();
  public selectedBank: BankDto;
  public cards: CardDto[] = [];
  public banks: BankDto[] = [];

  public allowedSum: number;
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
  })
  public topUpGroup: FormGroup = new FormGroup<any>({
    sumControl: new FormControl("", Validators.compose([
      Validators.required, Validators.min(1)
    ])),
    cardControl: new FormControl("", Validators.compose([
      Validators.required
    ]))
  })

  constructor(private bankService: BankService, private cardService: CardService,
              private toastService: ToastrService) {
    this.getMyBanks();
    this.findAllCards();
    this.getMyCards();
  }

  get controls() {
    return this.formGroup.controls;
  }

  get topUpControls() {
    return this.topUpGroup.controls;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDataPicker();
  }

  ngAfterViewChecked(): void {
  }


  public getMyBanks() {
    this.bankService.getMyBanks().subscribe({
      next: (banks) => {
        this.banks = banks.sort(this.sortByActive);
        this.initCharts(banks)
      }
    })
  }

  public sortByActive(a, b) {
    if (!a.isClosed && !!b.isClosed) {
      return -1; // `a` comes first
    } else if (!!a.isClosed && !b.isClosed) {
      return 1; // `b` comes first
    } else {
      return 0; // no change in order
    }
  }

  public isExpired(bank: BankDto) {
    return new Date(bank.deadline) < new Date();
  }

  public getMyCards() {
    this.cardService.findAllMyCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      }
    })
  }

  public topUpBank(close: HTMLButtonElement) {
    if (this.topUpGroup.valid) {
      this.bankService.topUpBank(this.selectedBank.bankId, this.topUpControls['cardControl'].value, this.topUpControls['sumControl'].value).subscribe({
        next: (bank) => {
          this.selectedBank = bank;
          close.click();
          this.toastService.success("Money transferred!");

          let updateBank = this.banks.find(value => value.bankId == bank.bankId);
          updateBank.currentAmount = bank.currentAmount;
          updateBank.transactions = bank.transactions;
          this.initSingleChart(updateBank);
          this.topUpGroup.reset();
        },
        error: (err) => {
          this.toastService.success("Failed to transfer money!")
        }
      });
    }
  }

  public closeBank(closeDetails: HTMLButtonElement) {
    this.bankService.closeBank(this.selectedBank.bankId, "").subscribe({
      next: (bank) => {
        let updateBank = this.banks.find(value => value.bankId == bank.bankId);
        updateBank.isClosed = true;
        closeDetails.click();
        this.initSingleChart(updateBank);
        this.toastService.success("Bank closed");
      }
    })
  }

  public findAllCards() {
    this.bankService.findAllMyCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      }
    })
  }

  public createBank(closeBtn) {
    if (this.formGroup.valid) {
      const createBankDto: CreateBankDto = {
        title: this.controls['bankTitleControl'].value,
        goal: this.controls['goalControl'].value,
        deadline: this.controls['deadlineControl'].value
      }
      this.bankService.createBank(createBankDto).subscribe({
        next: (bank) => {
          closeBtn.click();
          this.resetForm();
          this.toastService.success("Piggy bank created!");
          this.initSingleChart(bank);
          this.banks.push(bank);
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        }
      })
    }
  }

  public initDataPicker() {
    let element = document.getElementById("deadline");
    flatpickr(element, {
      minDate: new Date().setDate(new Date().getDate() + 5)
    });
  }

  public resetForm() {
    this.formGroup.reset();
    this.formGroup.markAsPending()
    this.formGroup.markAsUntouched();
  }

  public initCharts(banks: BankDto[]) {
    banks.forEach(bank => {
      this.initSingleChart(bank);
    });
  }

  public openBankDetails(bank: BankDto) {
    this.selectedBank = bank;
    this.allowedSum = this.selectedBank.goal - this.selectedBank.currentAmount;
    this.topUpControls['sumControl'].setValidators([Validators.compose([
      Validators.required, Validators.min(1), Validators.max(this.allowedSum)
    ])])
  }

  public getProgressColor() {
    let color = "bg-primary";
    if (this.selectedBank['isSuccess']) {
      color = "bg-success";
    } else if (this.selectedBank['isSuccess'] == false) {
      color = "bg-danger";
    }
    return color;
  }

  public initSingleChart(bank: BankDto) {
    const percent = (bank.currentAmount * 100) / bank.goal;
    let color = "#fff";
    let gradient = "#696cff";
    if (percent == 100) {
      color = '#d6f5c0';
      gradient = "#71dd37";
      bank['isSuccess'] = true;
    } else if (new Date() > new Date(bank.deadline)) {
      color = '#f5c5be';
      gradient = "#ff3e1d";
      bank['isSuccess'] = false;
    }
    bank['progress'] = parseInt(String(percent));

    const chartOptions: Partial<ChartOptions> = {
      series: [percent],
      chart: {
        height: 300,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: color,
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString() + "%";
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [gradient],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };
    this.chartsOptions.set(bank, chartOptions);
  }

  public resetTopUp() {
    this.topUpGroup.reset();
  }

  public selectTopUpCard(card: CardDto) {
    this.topUpControls['cardControl'].setValue(card.cardId);
  }

  public getCardType(card: CardDto) {
    if (card.type == "Visa") return "fa-cc-visa";
    if (card.type == "Mastercard") return "fa-cc-mastercard";
    if (card.type == "American Express") return "fa-cc-amex";
    if (card.type == "Discover") return "fa-cc-discover";
    return "fa-credit-card";
  }
}

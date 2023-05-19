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
import {BankService} from "../../_services/bank.service";
import {ToastrService} from "ngx-toastr";
import {CreateBankDto} from "../../models/create-bank-dto";
import {BankDto} from "../../models/bank-dto";


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
  public cards: any[] = [];
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

  constructor(private bankService: BankService,
              private toastService: ToastrService) {
    this.getMyBanks();
    this.findAllCards();
  }

  get controls() {
    return this.formGroup.controls;
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
        this.initCharts(banks)
      }
    })
  }

  public topUpBank(close: HTMLButtonElement) {
    console.log(this.topUpGroup);
    if (this.topUpGroup.valid) {
      this.bankService.topUpBank(this.selectedBank.bankId, "", 100).subscribe({
        next: (bank) => {
          this.selectedBank = bank;
          close.click();
        }
      });
    }
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
      const createBankDto: CreateBankDto = new CreateBankDto(
        this.controls['bankTitleControl'].value,
        this.controls['goalControl'].value,
        this.controls['deadlineControl'].value,)
      this.bankService.createBank(createBankDto).subscribe({
        next: (bank) => {
          closeBtn.click();
          this.resetForm();
          this.toastService.success("Piggy bank created!");
          this.initSingleChart(bank);
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
    if (percent == 100) {
      color = '#d6f5c0'
      bank['isSuccess'] = true;
    } else if (new Date() > new Date(bank.deadline)) {
      color = '#f5c5be';
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
          gradientToColors: ["#696cff"],
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
}

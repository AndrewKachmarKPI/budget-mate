import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class SavingsDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("closeForm") closeForm: HTMLButtonElement;

  public banks: BankDto[] = [];
  public chartsOptions: Map<string, Partial<ChartOptions>> = new Map<string, Partial<ChartOptions>>();
  public chartOptions: Partial<ChartOptions>;

  public formGroup: FormGroup = new FormGroup<any>({
    bankTitleControl: new FormControl("", Validators.compose([
      Validators.required, Validators.minLength(3)
    ])),
    goalControl: new FormControl(100, Validators.compose([
      Validators.required, Validators.min(5)
    ])),
    deadlineControl: new FormControl("", Validators.compose([
      Validators.required
    ])),
  })

  constructor(private bankService: BankService, private toastService: ToastrService) {
    this.initChart()
    this.getMyBanks();
  }

  get controls() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDataPicker();
  }


  public getMyBanks() {
    this.bankService.getMyBanks().subscribe({
      next: (banks) => {
        this.banks = banks;
      }
    })
  }

  public createBank() {
    if (this.formGroup.valid) {
      const createBankDto: CreateBankDto = new CreateBankDto(
        this.controls['bankTitleControl'].value,
        this.controls['goalControl'].value,
        this.controls['deadlineControl'].value,)
      this.bankService.createBank(createBankDto).subscribe({
        next: () => {
          this.closeForm.click();
          this.resetForm();
          this.toastService.success("Piggy bank created!");
        },
        error: (err) => {
          this.toastService.error("Failed to create piggy bank!");
          console.log(err);
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

  public initChart() {
    this.chartOptions = {
      series: [75],
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
            background: "#fff",
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
            margin: 0, // margin is in pixels
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
  }
}

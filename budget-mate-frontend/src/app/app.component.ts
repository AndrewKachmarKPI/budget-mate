import {Component} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {tadaAnimation} from "angular-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    tadaAnimation({duration: 5000}),
  ]
})
export class AppComponent {
  title = 'budget-mate-frontend';
  animationState: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) {
    this.spinnerService.getSpinner("main").subscribe(spinner => {
      this.animationState = spinner.show;
    });
  }
}

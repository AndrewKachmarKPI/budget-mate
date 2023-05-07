import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from '../../_services/storage.service';
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  animations: [trigger('load', [
    transition(':enter', [
      style({opacity: 0}),
      animate(600, style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(600, style({opacity: 0}))
    ])

  ])
  ]
})
export class RegisterComponent implements OnInit {

  public constructor(private authService: AuthService,
                     private router: Router, private toaster: ToastrService,
                     private storageService: StorageService) {
  }

  public passwordType: 'password' | 'text' = 'password';
  public isSubmitted: boolean = false;
  public formGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  changePasswordVisibility() {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.formGroup.valid) {
      const username: string = this.formGroup.controls.username.value;
      const email = this.formGroup.controls.email.value;
      const password: string = this.formGroup.controls.password.value;
      this.authService.register(username, email, password).subscribe({
        next: data => {
          this.router.navigate(['/auth/login']).then(() => {
            console.log(data);
            this.toaster.success("Successfully signed up!");
          });
        },
        error: err => {
          this.toaster.error("Oops, something went wrong...");
        }
      })
    }
  }
}

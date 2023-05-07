import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {StorageService} from '../../_services/storage.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {
  public passwordType: 'text' | 'password' = 'password';
  public formGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });
  public isSubmitted: boolean = false;

  constructor(private authService: AuthService,
              private router: Router, private toaster: ToastrService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
  }

  get controls() {
    return this.formGroup.controls;
  }

  changePaswordVisibility() {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }


  onSubmit(): void {
    this.isSubmitted = true;
    if (this.formGroup.valid) {
      const username: string = this.controls.username.value;
      const password: string = this.controls.password.value;

      this.authService.login(username, password).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']).then(() => {
            this.toaster.success("Successfully logged in!");
          });
        },
        error: err => {
          this.toaster.error("Failed login");
        }
      });
    }
  }

  onclickTest() {
    this.toaster.success('Logined');
  }

  login() {

  }
}

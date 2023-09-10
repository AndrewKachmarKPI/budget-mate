import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {StorageService} from "../../dashboard/services/storage.service";
import {TokenService} from "../services/token-service";

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

  constructor(private authService: AuthService, private tokenService: TokenService,
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
          this.router.navigate(['/profile'],{
            queryParams:{
              tab:'Account'
            }
          }).then(() => {
            this.toaster.success("Successfully logged in!");
          });
          //TODO save token to localstorage
          this.tokenService.saveToken(data['access_token']);
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

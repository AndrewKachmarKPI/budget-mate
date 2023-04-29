import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {StorageService} from '../../_services/storage.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public passwordType: 'text' | 'password' = 'password';

  public formGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required])),

  });

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
    console.log("FOERM", this.controls);
    if (this.formGroup.valid) {
      const username: string = this.controls.username.value;
      const password: string = this.controls.password.value;

      this.authService.login(username, password).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.toaster.error("Failed lgin");
        }
      });
    } else {
      this.toaster.error("FOrm is not valid");
    }

  }

  onclickTest() {
    this.toaster.success('Logined');
  }

  login() {

  }
}

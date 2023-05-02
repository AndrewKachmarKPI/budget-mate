import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from "./login/login.component";
import {RouterOutlet} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AuthRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class AuthModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppRoutingModule} from "./app-routing.module";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {TokenInterceptor} from "./_helpers/token-interceptor";
import {SpinnerInterceptor} from "./_helpers/spinner-interceptor";
import {RegisterComponent} from './auth/register/register.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [RegisterComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

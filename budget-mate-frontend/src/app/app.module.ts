import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppRoutingModule} from "./app-routing.module";
import {ToastrModule} from "ngx-toastr";
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";
import {TokenInterceptor} from "./_helpers/token-interceptor";
import {SpinnerInterceptor} from "./_helpers/spinner-interceptor";

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
    NgxSpinnerModule
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

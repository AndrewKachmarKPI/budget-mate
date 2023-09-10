import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show("main");
    return next.handle(req)
      .pipe(tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide("main");
          }
        },
        error: () => {
          this.spinnerService.hide("main");
        }
      }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) {
  }

  public createBank(): Observable<any> {
    return new Observable<any>();
  }
}

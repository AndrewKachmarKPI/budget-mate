import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../environments/environment";
import {CreateBudgetDto} from "../auth/models/create-budget-dto";
import {BudgetDto} from "../auth/models/budget-dto";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private http: HttpClient) {
  }

  public createBudget(createBudgetDto: CreateBudgetDto): Observable<BudgetDto> {
    const req = `${url}/budgets`
    return this.http.post<BudgetDto>(req, createBudgetDto);
  }
  public getAllBudgets(): Observable<BudgetDto[]> {
    const req = `${url}/budgets`
    return this.http.get<BudgetDto[]>(req);
  }
}

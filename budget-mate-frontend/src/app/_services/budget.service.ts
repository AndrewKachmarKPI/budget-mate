import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../environments/environment";
import {CreateBudgetDto} from "../auth/models/create-budget-dto";
import {BudgetDto} from "../auth/models/budget-dto";
import {TransactionDto} from "../models/transaction-dto";
import {ExpensesCategoryDto} from "../auth/models/expenses-category-dto";
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

  findBudgetById(budgetId: string): Observable<BudgetDto> {
    const req = `${url}/budgets`
    return this.http.get<BudgetDto>(`${req}/${budgetId}`);
  }
  createTransaction(budgetId: string, sum: number, categoryId: string, cardId: string): Observable<TransactionDto> {
    const params = { sum, categoryId, cardId };
    const req = `${url}/budgets`;
    return this.http.put<TransactionDto>(`${req}/${budgetId}`, params);
  }
  createCategory(name:string,icon:string): Observable<ExpensesCategoryDto>{
    const params = { name,icon };
    const req = `${url}/categories`;
    return this.http.put<ExpensesCategoryDto>(`${req}`, params);
  }
}

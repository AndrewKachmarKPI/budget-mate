import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateBankDto} from "../../models/create-bank-dto";
import {BankDto} from "../../models/bank-dto";
import {url} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) {
  }

  public createBank(createBankDto: CreateBankDto): Observable<BankDto> {
    const req = `${url}/banks`
    return this.http.post<BankDto>(req, createBankDto);
  }

  public closeBank(bankId: string, cardId: string): Observable<BankDto> {
    const req = `${url}/banks/close`
    return this.http.put<BankDto>(req, {}, {
      params: {
        bankId: bankId,
        cardId: cardId
      }
    });
  }

  public getBankById(bankId: string): Observable<BankDto> {
    const req = `${url}/banks/${bankId}`
    return this.http.get<BankDto>(req);
  }

  public getMyBanks(): Observable<BankDto[]> {
    const req = `${url}/banks`
    return this.http.get<BankDto[]>(req);
  }

  public topUpBank(bankId: string, cardId: string, sum: number): Observable<BankDto> {
    const req = `${url}/banks/top-up`
    return this.http.post<BankDto>(req, {}, {
      params: {
        bankId: bankId,
        cardId: cardId,
        sum: sum
      }
    });
  }

  public findAllMyCards(): Observable<any> {
    const req = `${url}/cards`
    return this.http.get(req);
  }
}

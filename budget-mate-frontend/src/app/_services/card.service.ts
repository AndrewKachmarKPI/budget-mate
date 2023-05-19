import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../environments/environment";
import {CardDto} from "../models/card-dto";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  public findAllMyCards(): Observable<CardDto[]> {
    const req = `${url}/cards`
    return this.http.get<CardDto[]>(req);
  }

  public updateCardById(cardId:string,cardDto:CardDto): Observable<CardDto> {
    const req = `${url}/cards/${cardId}`
    return this.http.put<CardDto>(req,cardDto);
  }

  public removeCardById(cardId: string): Observable<boolean> {
    const req = `${url}/cards/${cardId}`;
    return this.http.delete<boolean>(req);
  }
  addCard(cardDto: CardDto): Observable<CardDto> {
    const req = `${url}/cards`;
    return this.http.post<CardDto>(req, cardDto);
  }
}

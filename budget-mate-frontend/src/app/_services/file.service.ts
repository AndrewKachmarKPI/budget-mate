import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateBankDto} from "../models/create-bank-dto";
import {Observable} from "rxjs";
import {BankDto} from "../models/bank-dto";
import {url} from "../../environments/environment";
import {FileDto} from "../models/file-dto";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {
  }

  public getAllDefaultAvatars(): Observable<FileDto[]> {
    const req = `${url}/files/default`
    return this.http.get<FileDto[]>(req);
  }

}

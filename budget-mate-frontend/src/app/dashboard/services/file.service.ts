import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../../environments/environment";
import {FileDto} from "../../models/file-dto";

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

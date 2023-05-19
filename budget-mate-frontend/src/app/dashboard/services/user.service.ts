import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../../auth/models/user-dto";
import {url} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private avatarSource: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentAvatar: Observable<string> = this.avatarSource.asObservable();

  updateAvatar(url: string) {
    this.avatarSource.next(url);
  }

  constructor(private http: HttpClient) {
  }

  changeAvatar(fileId: string) {
    return this.http.post(`${url}/users/change-avatar`, {}, {
      responseType: "text",
      params: {
        fileId: fileId
      }
    });
  }

  myProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${url}/users/me`);
  }
}

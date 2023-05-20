import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../../auth/models/user-dto";
import {url} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {BillingPlan} from "../../auth/models/billing-plan";
import {ProfileDto} from "../../auth/models/profile-dto";
import {UserRoles} from "../../auth/models/user-roles";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private avatarSource: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentAvatar: Observable<string> = this.avatarSource.asObservable();
  private planSource: BehaviorSubject<BillingPlan> = new BehaviorSubject<BillingPlan>(BillingPlan.BASIC);
  currentPlan: Observable<BillingPlan> = this.planSource.asObservable();

  updateAvatar(url: string) {
    this.avatarSource.next(url);
  }

  updatePlan(url: BillingPlan) {
    this.planSource.next(url);
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

  changeProfile(dto: ProfileDto) {
    return this.http.post(`${url}/users/change-profile`, dto);
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${url}/users`);
  }

  promoteUser(userRole: string): Observable<UserDto> {
    return this.http.put<UserDto>(`${url}/users/promote`, {}, {
      params: {
        role: userRole
      }
    });
  }

  myProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${url}/users/me`);
  }
}

import {BillingPlan} from "./billing-plan";
import {UserStatus} from "./user-status";

export class UserDto {
  constructor(public username?: string,
              public userStatus?: UserStatus,
              public firstName?: string,
              public lastName?: string,
              public email?: string,
              public phoneNumber?: string,
              public billingPlan?: BillingPlan,
              public registered?: string,
              public currency?: string,
              public avatarId?: string) {
  }
}

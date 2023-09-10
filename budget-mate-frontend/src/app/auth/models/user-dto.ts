import {BillingPlan} from "./billing-plan";
import {UserStatus} from "./user-status";
import {RoleDto} from "./role-dto";

export interface UserDto {
  username?: string;
  userStatus?: UserStatus;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  billingPlan?: BillingPlan;
  registered?: string;
  currency?: string;
  avatarId?: string;
  roles?: RoleDto[];
}

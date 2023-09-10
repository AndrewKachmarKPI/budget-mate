import {TransactionDto} from "./transaction-dto";

export interface BankDto {
  id?: string;
  bankId?: string;
  bankName?: string;
  goal?: number;
  currentAmount?: number;
  deadline?: string;
  isClosed?: boolean;
  transactions?: TransactionDto[];
}

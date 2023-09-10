import {TransactionDto} from "../../models/transaction-dto";

export interface BudgetDto {
  budgetId: string;
  name: string;
  owner: string;
  budget: number;
  expenses: number;
  deadline: string;
  created: string;
  category: string;
  transactions: TransactionDto[];
}

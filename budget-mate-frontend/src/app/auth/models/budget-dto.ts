import {TransactionDto} from "../../models/transaction-dto";

export class BudgetDto {
  constructor(public budgetId: string,
              public name: string,
              public owner: string,
              public budget: number,
              public expenses: number,
              public deadline: string,
              public created: string,
              public category: string,
              public transactions: TransactionDto[]) {
  }
}

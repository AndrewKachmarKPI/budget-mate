import {CardDto} from "./card-dto";
import {ExpensesCategoryDto} from "../auth/models/expenses-category-dto";

export class TransactionDto {
  constructor(public created: string,
              public sum: number,
              public cardDto: CardDto,
              public category: ExpensesCategoryDto) {
  }
}

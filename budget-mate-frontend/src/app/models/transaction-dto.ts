import {CardDto} from "./card-dto";
import {ExpensesCategoryDto} from "../auth/models/expenses-category-dto";

export interface TransactionDto {
  created: string;
  sum: number;
  cardDto: CardDto;
  category: ExpensesCategoryDto;
}

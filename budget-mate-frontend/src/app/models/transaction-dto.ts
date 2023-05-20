import {CardDto} from "./card-dto";

export class TransactionDto {
  constructor(public created: string,
              public sum: number,
              public cardDto: CardDto) {
  }
}

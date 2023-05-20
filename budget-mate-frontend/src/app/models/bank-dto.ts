import {TransactionDto} from "./transaction-dto";

export class BankDto {
  constructor(private _id?: string,
              private _bankId?: string,
              private _bankName?: string,
              private _goal?: number,
              private _currentAmount?: number,
              private _deadline?: string,
              private _isClosed?: boolean,
              private _transactions?: TransactionDto[]) {
  }

  get id(): string {
    return this._id;
  }

  get isClosed(): boolean {
    return this._isClosed;
  }

  set isClosed(value: boolean) {
    this._isClosed = value;
  }

  get bankId(): string {
    return this._bankId;
  }

  get bankName(): string {
    return this._bankName;
  }

  get goal(): number {
    return this._goal;
  }

  get currentAmount(): number {
    return this._currentAmount;
  }

  get deadline(): string {
    return this._deadline;
  }

  get transactions(): TransactionDto[] {
    return this._transactions;
  }

  set id(value: string) {
    this._id = value;
  }

  set bankId(value: string) {
    this._bankId = value;
  }

  set bankName(value: string) {
    this._bankName = value;
  }

  set goal(value: number) {
    this._goal = value;
  }

  set currentAmount(value: number) {
    this._currentAmount = value;
  }

  set deadline(value: string) {
    this._deadline = value;
  }

  set transactions(value: TransactionDto[]) {
    this._transactions = value;
  }
}

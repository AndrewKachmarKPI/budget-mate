export class BankDto {
  constructor(private _id?: string,
              private _bankId?: string,
              private _bankName?: string,
              private _goal?: number,
              private _currentAmount?: number,
              private _deadline?: string) {
  }

  get id(): string {
    return this._id;
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
}

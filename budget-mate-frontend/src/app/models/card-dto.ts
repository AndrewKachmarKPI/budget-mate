export class CardDto {
  constructor(private _cardId?: string,
              private _number?: string,
              private _holderName?: string,
              private _expirationDate?: string,
              private _secretCode?: number,
              private _type?: string,
              //private _isPrimary?: boolean
  ) {
  }

  get id(): string {
    return this._cardId;
  }

  get type(): string {
    return this._type;
  }

  get expiration(): string {
    return this._expirationDate;
  }

  get number(): string {
    return this._number;
  }

  get cvv(): number {
    return this._secretCode;
  }

  /*get isPrimary(): boolean {
    return this._isPrimary;
  }*/
}

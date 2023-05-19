export class CardDto {
  constructor(private _cardId?: string,
              private _number?: string,
              private _holderName?: string,
              private _expirationDate?: string,
              private _secretCode?: string,
              private _type?: string,
              //private _isPrimary?: boolean
  ) {
  }

  get id(): string {
    return this._cardId;
  }
  get number(): string {
    return this._number;
  }
  get holder(): string {
    return this._holderName;
  }
  get expiration(): string {
    return this._expirationDate;
  }
  get secretCode(): string {
    return this._secretCode;
  }
  get type(): string {
    return this._type;
  }


  /*get isPrimary(): boolean {
    return this._isPrimary;
  }*/
}

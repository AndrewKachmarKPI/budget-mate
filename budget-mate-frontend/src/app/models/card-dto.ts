export class CardDto {
  constructor(public cardId?: string,
              public number?: string,
              public holderName?: string,
              public name?: string,
              public expirationDate?: string,
              public secretCode?: string,
              public type?: string,
              //private _isPrimary?: boolean
  ) {
  }
}

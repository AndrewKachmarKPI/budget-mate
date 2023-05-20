export class CreateCardDto{
  constructor(   public number?: string,
                 public name?: string,
                 public expDate?: string,
                 public secretCode?: string) {
  }
}

export class CreateBankDto {
  constructor(private title?: string,
              private goal?: number,
              private deadline?: string) {
  }

}

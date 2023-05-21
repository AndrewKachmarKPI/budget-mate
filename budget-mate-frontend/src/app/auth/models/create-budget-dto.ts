export class CreateBudgetDto {
  constructor(public name: string,
              public budget: number,
              public category: string,
              public deadline: string) {
  }
}

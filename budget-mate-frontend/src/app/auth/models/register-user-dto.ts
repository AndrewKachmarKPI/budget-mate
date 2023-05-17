export class RegisterUserDto {
  constructor(public username?: string,
              public email?: string,
              public password?:string) {
  }
}

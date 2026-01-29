export class Student {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public course: string,
    public shift: string,
    public agreeTerms: boolean
  ) {}
}
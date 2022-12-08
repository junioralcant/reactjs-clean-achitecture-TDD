export interface IFielValidation {
  field: string;
  validate(input: object): Error | null;
}

export interface IFielValidation {
  field: string;
  validate(value: string): Error | null;
}

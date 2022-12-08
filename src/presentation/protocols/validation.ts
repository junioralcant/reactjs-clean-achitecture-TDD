export interface IValidation {
  validate(fieldName: string, input: object): string;
  getMessageError?(): string;
  setMessageError?(message: string): string;
}

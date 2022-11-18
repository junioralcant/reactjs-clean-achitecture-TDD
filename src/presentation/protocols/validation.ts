export interface IValidation {
  validate(fieldName: string, fieldValue: string): string;
  getMessageError(): string;
  setMessageError(message: string): string;
}

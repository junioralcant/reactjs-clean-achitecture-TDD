export interface IValidation {
  validate(fieldName: string, fieldValue: string): string;
  getFieldName(): string;
  getFieldValue(): string;
  getMessageError(): string;
  setMessageError(message: string): string;
}

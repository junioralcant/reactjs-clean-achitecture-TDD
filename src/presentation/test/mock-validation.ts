import { IValidation } from '../protocols/validation';

export class ValidationSpy implements IValidation {
  errorMessage: string = '';
  fieldName: string = '';
  fieldValue: string = '';

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }

  getFieldName(): string {
    return this.fieldName;
  }

  getFieldValue(): string {
    return this.fieldValue;
  }

  getMessageError(): string {
    return this.errorMessage;
  }

  setMessageError(message: string): string {
    this.errorMessage = message;
    return this.errorMessage;
  }
}

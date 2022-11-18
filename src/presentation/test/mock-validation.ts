import { IValidation } from '../protocols/validation';

export class ValidationStub implements IValidation {
  errorMessage: string = '';

  validate(fieldName: string, fieldValue: string): string {
    return this.errorMessage;
  }

  getMessageError(): string {
    return this.errorMessage;
  }

  setMessageError(message: string): string {
    this.errorMessage = message;
    return this.errorMessage;
  }
}

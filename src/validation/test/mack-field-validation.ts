import {IFielValidation} from '../protocols/field-validation';

export class FieldValidationSpy implements IFielValidation {
  error: Error | null = null;

  constructor(readonly field: string) {}
  validate(input: object): Error | null {
    return this.error;
  }
}

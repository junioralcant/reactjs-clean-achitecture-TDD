import {IFielValidation} from '../../protocols/field-validation';
import {InvalidFieldError} from '../../errors/invalid-field-error';

export class MinLengthValidation implements IFielValidation {
  constructor(readonly field: string, readonly minLength: number) {}

  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}

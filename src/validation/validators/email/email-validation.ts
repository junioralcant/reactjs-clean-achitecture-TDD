import {InvalidFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class EmailValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}

import {RequiredFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class RequiredFieldValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError();
  }
}

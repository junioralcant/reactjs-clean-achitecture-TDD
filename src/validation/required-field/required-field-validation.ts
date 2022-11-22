import {RequiredFieldError} from '../errors';
import {IFielValidation} from '../protocols/field-validation';

export class RequeriedFileValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return new RequiredFieldError();
  }
}

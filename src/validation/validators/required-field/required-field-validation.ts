import {RequiredFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class RequiredFieldValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    return input[this.field as keyof typeof input]
      ? null
      : new RequiredFieldError();
  }
}

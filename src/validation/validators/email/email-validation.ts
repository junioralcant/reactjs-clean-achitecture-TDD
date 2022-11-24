import {InvalidFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class EmailValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(value) ? null : new InvalidFieldError();
  }
}

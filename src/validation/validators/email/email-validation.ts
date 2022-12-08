import {InvalidFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class EmailValidation implements IFielValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !input[this.field as keyof typeof input] ||
      emailRegex.test(input[this.field as keyof typeof input])
      ? null
      : new InvalidFieldError();
  }
}

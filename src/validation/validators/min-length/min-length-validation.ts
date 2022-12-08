import {IFielValidation} from '../../protocols/field-validation';
import {InvalidFieldError} from '../../errors/invalid-field-error';

export class MinLengthValidation implements IFielValidation {
  constructor(readonly field: string, readonly minLength: number) {}

  validate(input: object): Error | null {
    const value = input[this.field as keyof typeof input] as string;

    return value?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}

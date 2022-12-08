import {InvalidFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class CompareFieldValidation implements IFielValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error | null {
    return input[this.field as keyof typeof input] !==
      input[this.fieldToCompare as keyof typeof input]
      ? new InvalidFieldError()
      : null;
  }
}

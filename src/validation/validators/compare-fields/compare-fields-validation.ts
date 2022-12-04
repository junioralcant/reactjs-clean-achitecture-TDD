import {InvalidFieldError} from '../../errors';
import {IFielValidation} from '../../protocols/field-validation';

export class CompareFieldValidation implements IFielValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate(value: string): Error | null {
    return value !== this.valueToCompare
      ? new InvalidFieldError()
      : null;
  }
}

import {IFielValidation} from '../../protocols/field-validation';
import {EmailValidation} from '../email/email-validation';
import {MinLengthValidation} from '../min-length/min-length-validation';
import {RequiredFieldValidation} from '../required-field/required-field-validation';

export class ValidationBuilder {
  private constructor(
    private readonly filedName: string,
    private readonly validations: IFielValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(
      new RequiredFieldValidation(this.filedName)
    );

    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.filedName));
    return this;
  }

  min(lenght: number): ValidationBuilder {
    this.validations.push(
      new MinLengthValidation(this.filedName, lenght)
    );
    return this;
  }

  build(): IFielValidation[] {
    return this.validations;
  }
}

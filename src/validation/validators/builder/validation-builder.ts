import {IFielValidation} from '../../protocols/field-validation';
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

  build(): IFielValidation[] {
    return this.validations;
  }
}

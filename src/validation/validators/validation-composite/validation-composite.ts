import {IValidation} from '../../../presentation/protocols/validation';
import {IFielValidation} from '../../protocols/field-validation';

export class ValidationComposite implements IValidation {
  constructor(private readonly validators: IFielValidation[]) {}

  static build(validators: IFielValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(
      (validation) => validation.field === fieldName
    );

    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message as string;
      }
    }

    return '';
  }
}

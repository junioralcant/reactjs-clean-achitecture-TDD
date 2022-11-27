import {IValidation} from '../../../presentation/protocols/validation';
import {IFielValidation} from '../../protocols/field-validation';

export class ValidationComposite implements IValidation {
  constructor(private readonly validators: IFielValidation[]) {}

  static build(validators: IFielValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(
      (validation) => validation.field === fieldName
    );

    for (const validator of validators) {
      const error = validator.validate(fieldValue);
      if (error) {
        return error.message as string;
      }
    }

    return '';
  }

  getMessageError(): string {
    throw new Error('Method not implemented.');
  }

  setMessageError(message: string): string {
    throw new Error('Method not implemented.');
  }
}

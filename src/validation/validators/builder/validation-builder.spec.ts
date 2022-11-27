import {EmailValidation} from '../email/email-validation';
import {MinLengthValidation} from '../min-length/min-length-validation';
import {RequiredFieldValidation} from '../required-field/required-field-validation';
import {ValidationBuilder} from './validation-builder';

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidations', () => {
    const validations = ValidationBuilder.field('any_field')
      .required()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
    ]);
  });

  it('Should return EmailValidations', () => {
    const validations = ValidationBuilder.field('any_field')
      .email()
      .build();

    expect(validations).toEqual([new EmailValidation('any_field')]);
  });

  it('Should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field')
      .min(5)
      .build();

    expect(validations).toEqual([
      new MinLengthValidation('any_field', 5),
    ]);
  });
});

import {faker} from '@faker-js/faker';
import {CompareFieldValidation} from '../compare-fields/compare-fields-validation';
import {EmailValidation} from '../email/email-validation';
import {MinLengthValidation} from '../min-length/min-length-validation';
import {RequiredFieldValidation} from '../required-field/required-field-validation';
import {ValidationBuilder} from './validation-builder';

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidations', () => {
    const field = faker.database.column();

    const validations = ValidationBuilder.field(field)
      .required()
      .build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('Should return EmailValidations', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field)
      .email()
      .build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();

    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  it('Should return CompareFieldValidation', () => {
    const field = faker.database.column();
    const fieldToCompara = faker.database.column();

    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompara)
      .build();

    expect(validations).toEqual([
      new CompareFieldValidation(field, fieldToCompara),
    ]);
  });

  it('Should return a list of validations', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(5)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, 5),
      new EmailValidation(field),
    ]);
  });
});

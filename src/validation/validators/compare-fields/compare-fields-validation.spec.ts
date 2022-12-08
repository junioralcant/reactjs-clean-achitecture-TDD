import {faker} from '@faker-js/faker';

import {InvalidFieldError} from '../../errors';
import {CompareFieldValidation} from './compare-fields-validation';

function makeSut(
  field: string,
  fieldToCompare: string
): CompareFieldValidation {
  return new CompareFieldValidation(field, fieldToCompare);
}

describe('CompareFieldValidation', () => {
  it('Shold return error if compare is invalid', () => {
    const field = faker.random.word();
    const fieldToCompara = faker.random.word();

    const sut = makeSut(field, fieldToCompara);

    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompara]: faker.random.word(),
    });

    expect(error).toEqual(new InvalidFieldError());
  });

  it('Shold return falsy if compare id valid', () => {
    const field = faker.random.word();
    const fieldToCompara = faker.random.word();
    const value = faker.random.word();

    const sut = makeSut(field, fieldToCompara);

    const error = sut.validate({
      [field]: value,
      [fieldToCompara]: value,
    });

    expect(error).toBeFalsy();
  });
});

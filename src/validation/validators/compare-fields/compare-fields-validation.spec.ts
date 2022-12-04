import {faker} from '@faker-js/faker';

import {InvalidFieldError} from '../../errors';
import {CompareFieldValidation} from './compare-fields-validation';

function makeSut(valueToCompare: string): CompareFieldValidation {
  return new CompareFieldValidation(
    faker.database.column(),
    valueToCompare
  );
}

describe('CompareFieldValidation', () => {
  it('Shold return error if compare is invalid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });

  it('Shold return falsy if comape id valid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});

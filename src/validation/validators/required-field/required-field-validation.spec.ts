import {faker} from '@faker-js/faker';

import {RequiredFieldError} from '../../errors';
import {RequiredFieldValidation} from './required-field-validation';

function makeSut(): RequiredFieldValidation {
  return new RequiredFieldValidation(faker.internet.email());
}

describe('RequiredFieldValidation', () => {
  it('Shold return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('Shold return falsy if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});

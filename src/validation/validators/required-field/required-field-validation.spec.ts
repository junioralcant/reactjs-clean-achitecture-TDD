import {faker} from '@faker-js/faker';

import {RequiredFieldError} from '../../errors';
import {RequiredFieldValidation} from './required-field-validation';

function makeSut(field: string): RequiredFieldValidation {
  return new RequiredFieldValidation(field);
}

describe('RequiredFieldValidation', () => {
  it('Shold return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: ''});
    expect(error).toEqual(new RequiredFieldError());
  });

  it('Shold return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.random.word()});
    expect(error).toBeFalsy();
  });
});

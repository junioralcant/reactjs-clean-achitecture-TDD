import {faker} from '@faker-js/faker';

import {RequiredFieldError} from '../errors';
import {RequeriedFileValidation} from './required-field-validation';

describe('RequiredFieldValidation', () => {
  it('Shold return error if field is empty', () => {
    const sut = new RequeriedFileValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('Shold return falsy if field is not empty', () => {
    const sut = new RequeriedFileValidation('email');
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});

import {faker} from '@faker-js/faker';
import {InvalidFieldError} from '../../errors/invalid-field-error';
import {MinLengthValidation} from './min-length-validation';

function makeSut(): MinLengthValidation {
  return new MinLengthValidation(faker.random.word(), 5);
}

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(3));
    expect(error).toEqual(new InvalidFieldError());
  });

  it('Should return falsy if value is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});

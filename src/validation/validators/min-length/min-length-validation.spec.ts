import {faker} from '@faker-js/faker';
import {InvalidFieldError} from '../../errors/invalid-field-error';
import {MinLengthValidation} from './min-length-validation';

function makeSut(field: string): MinLengthValidation {
  return new MinLengthValidation(field, 5);
}

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(3),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  it('Should return falsy if value is valid', () => {
    const field = faker.random.word();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(5),
    });
    expect(error).toBeFalsy();
  });

  it('Should return falsy does not exists in schema', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate({
      [faker.random.word()]: faker.random.alphaNumeric(5),
    });
    expect(error).toBeFalsy();
  });
});

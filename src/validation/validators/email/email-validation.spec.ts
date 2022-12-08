import {faker} from '@faker-js/faker';
import {InvalidFieldError} from '../../errors';
import {EmailValidation} from './email-validation';

function makeSut(field: string): EmailValidation {
  return new EmailValidation(field);
}

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.random.word()});
    expect(error).toEqual(new InvalidFieldError());
  });

  it('Should return falsy if email is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: faker.internet.email()});
    expect(error).toBeFalsy();
  });

  it('Should return falsy if email is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({[field]: ''});
    expect(error).toBeFalsy();
  });
});

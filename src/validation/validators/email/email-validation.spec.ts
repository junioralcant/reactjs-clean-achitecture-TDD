import {InvalidFieldError} from '../../errors';
import {EmailValidation} from './email-validation';

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});

import {FieldValidationSpy} from '../test/mack-field-validation';
import {ValidationComposite} from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

function makeSut(): SutTypes {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];

  const sut = new ValidationComposite(fieldValidationSpy);
  return {
    sut,
    fieldValidationSpy,
  };
}

describe('ValidationComposite', () => {
  it('Should return error if any validation falsy', () => {
    const {sut, fieldValidationSpy} = makeSut();

    fieldValidationSpy[0].error = new Error('first_error_message');
    fieldValidationSpy[1].error = new Error('second_error_message');

    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('first_error_message');
  });
});

import {faker} from '@faker-js/faker';
import {FieldValidationSpy} from '../test/mack-field-validation';
import {ValidationComposite} from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpy: FieldValidationSpy[];
};

function makeSut(fieldName: string): SutTypes {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationSpy);
  return {
    sut,
    fieldValidationSpy,
  };
}

describe('ValidationComposite', () => {
  it('Should return error if any validation falsy', () => {
    const fieldName = faker.database.column();
    const {sut, fieldValidationSpy} = makeSut(fieldName);

    const error1 = faker.random.words();
    const error2 = faker.random.words();

    fieldValidationSpy[0].error = new Error(error1);
    fieldValidationSpy[1].error = new Error(error2);

    const error = sut.validate(fieldName, faker.random.words());
    expect(error).toBe(error1);
  });

  it('Should return falsy if there is no error', () => {
    const fieldName = faker.database.column();
    const {sut} = makeSut(fieldName);
    const error = sut.validate('any_field', faker.random.words());
    expect(error).toBeFalsy();
  });
});

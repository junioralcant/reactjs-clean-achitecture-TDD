import {makeLoginValidation} from './login-validation-factory';
import {ValidationComposite} from '../../../../validation/validators/validation-composite/validation-composite';
import {RequiredFieldValidation} from '../../../../validation/validators/required-field/required-field-validation';
import {MinLengthValidation} from '../../../../validation/validators/min-length/min-length-validation';
import {EmailValidation} from '../../../../validation/validators/email/email-validation';

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
      ])
    );
  });
});

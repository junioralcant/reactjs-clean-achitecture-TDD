import {ValidationComposite} from '../../../../validation/validators/validation-composite/validation-composite';
import {makeSignUpValidation} from './signup-validation-factory';
import {RequiredFieldValidation} from '../../../../validation/validators/required-field/required-field-validation';
import {MinLengthValidation} from '../../../../validation/validators/min-length/min-length-validation';
import {EmailValidation} from '../../../../validation/validators/email/email-validation';
import {CompareFieldValidation} from '../../../../validation/validators/compare-fields/compare-fields-validation';

describe('SignUpValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 3),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldValidation(
          'passwordConfirmation',
          'password'
        ),
      ])
    );
  });
});

import {SignUp} from '../../../../presentation/pages/signup/signup';
import {makeRemoteAddAccount} from '../../usecases/add-account/remote-add-account-factory';
import {makeSignUpValidation} from './signup-validation-factory';

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
}

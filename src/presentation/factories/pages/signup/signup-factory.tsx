import {SignUp} from '../../../pages/signup/signup';
import {makeRemoteAddAccount} from '../../usecases/add-account/remote-add-account-factory';
import {makeLocalSaveAccessTokenFactory} from '../../usecases/save-acess-token/local-save-access-token-factory';
import {makeSignUpValidation} from './signup-validation-factory';

export function makeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />
  );
}

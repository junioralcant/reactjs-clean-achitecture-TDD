import {Login} from '../../../pages/login/login';
import {makeRemoteAuthentication} from '../../usecases/authentication/remote-authentication-factory';
import {makeLocalSaveAccessTokenFactory} from '../../usecases/save-acess-token/local-save-access-token-factory';
import {makeLoginValidation} from './login-validation-factory';

export function makeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />
  );
}

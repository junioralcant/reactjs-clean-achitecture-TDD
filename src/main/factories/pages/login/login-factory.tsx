import {Login} from '../../../../presentation/pages/login/login';
import {makeRemoteAuthentication} from '../../usecases/authentication/remote-authentication-factory';
import {makeLocalUpdateCurrentAccountFactory} from '../../usecases/update-current-account/local-update-current-account-factory';
import {makeLoginValidation} from './login-validation-factory';

export function makeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccountFactory()}
    />
  );
}

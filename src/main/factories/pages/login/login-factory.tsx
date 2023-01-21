import {Login} from '../../../../presentation/pages/login/login';
import {makeRemoteAuthentication} from '../../usecases/authentication/remote-authentication-factory';
import {makeLoginValidation} from './login-validation-factory';

export function MakeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
}

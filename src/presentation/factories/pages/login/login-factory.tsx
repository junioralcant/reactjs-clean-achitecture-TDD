import {RemoteAuthentication} from '../../../../data/useCases/authentication/remote-authentication';
import {AxiosHttpClient} from '../../../../infra/http/axios-http-client/axiost-http-client';
import {ValidationBuilder} from '../../../../validation/validators/builder/validation-builder';
import {ValidationComposite} from '../../../../validation/validators/validation-composite/validation-composite';
import {Login} from '../../../pages/login/login';

export function makeLogin() {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(
    url,
    axiosHttpClient
  );
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
}

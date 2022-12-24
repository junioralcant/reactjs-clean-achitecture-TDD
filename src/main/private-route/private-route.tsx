import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {ApiContext} from '../../presentation/contexs/api/api-context';

export function PrivateRouter({children}: RouteProps): any {
  const {getCurrentAccount} = useContext(ApiContext);

  const accessToken = getCurrentAccount()?.accessToken;

  return accessToken ? children : <Navigate to="/login" replace />;
}

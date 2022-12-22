import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';

export function PrivateRouter(props: RouteProps) {
  return <Navigate to="/login" />;
}

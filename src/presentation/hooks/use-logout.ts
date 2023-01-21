import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ApiContext} from '../contexs/api/api-context';

type ResultType = () => void;

export function useLogout(): ResultType {
  const navigate = useNavigate();
  const {setCurrentAccount} = useContext(ApiContext);

  return (): void => {
    setCurrentAccount(undefined);
    navigate('/login');
  };
}

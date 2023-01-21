import {AccessDeniedError} from '../../domain/errors/access-denied-error';
import {useLogout} from './use-logout';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export function useErrorHandler(callback: CallBackType): ResultType {
  const logoutHook = useLogout();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logoutHook();
    } else {
      callback(error);
    }
  };
}

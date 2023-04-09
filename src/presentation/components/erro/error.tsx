import {useContext} from 'react';
import './error-styles.scss';

type Props = {
  error: string;
  reload: () => void;
};

export function ErrorList({error, reload}: Props) {
  return (
    <div className="errorWrap">
      <span data-testid="error">{error}</span>
      <button onClick={reload} data-testid="reload">
        Tentar novamente
      </button>
    </div>
  );
}

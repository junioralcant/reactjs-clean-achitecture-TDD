import {useContext} from 'react';
import {CreateContextSurvey} from '../contex/contex';
import './error-styles.scss';

export function ErrorList() {
  const {state} = useContext(CreateContextSurvey);

  return (
    <div>
      <span className="errorWrap" data-testid="error">
        {state.error}
      </span>
      <button>Recarregar</button>
    </div>
  );
}

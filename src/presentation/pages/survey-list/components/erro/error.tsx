import {useContext} from 'react';
import {CreateContextSurvey} from '../contex/contex';
import './error-styles.scss';

export function ErrorList() {
  const {state, setState} = useContext(CreateContextSurvey);

  function reload(): void {
    setState({surveys: [], error: '', reload: !state.reload});
  }

  return (
    <div>
      <span className="errorWrap" data-testid="error">
        {state.error}
      </span>
      <button onClick={reload} data-testid="reload">
        Tentar novamente
      </button>
    </div>
  );
}

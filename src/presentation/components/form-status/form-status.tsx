import React, { useContext } from 'react';
import { CreateContextForm } from '../../contexs/form/form-context';
import { Spinner } from '../spinner/spinner';
import './form-status-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function FormStatus(props: Props) {
  const { state, errorState } = useContext(CreateContextForm);
  return (
    <div data-testid="error-wrap" className="errorWrap">
      {state.isLoading && <Spinner className="spinner" />}
      {errorState.main && (
        <span className="error">{errorState.main}</span>
      )}
    </div>
  );
}

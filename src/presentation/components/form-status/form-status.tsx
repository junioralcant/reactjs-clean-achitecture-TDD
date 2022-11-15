import React, { useContext } from 'react';
import { CreateContextForm } from '../../contexs/form/form-context';
import { Spinner } from '../spinner/spinner';
import './form-status-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function FormStatus(props: Props) {
  const { isLoading, errorMessage } = useContext(CreateContextForm);

  return (
    <div data-testid="error-wrap" className="errorWrap">
      {isLoading && <Spinner className="spinner" />}
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
}

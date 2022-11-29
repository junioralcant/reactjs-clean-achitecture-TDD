import React, {useContext} from 'react';
import {CreateContextForm} from '../../contexs/form/form-context';
import {Spinner} from '../spinner/spinner';
import './form-status-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function FormStatus(props: Props) {
  const {state} = useContext(CreateContextForm);
  const {isLoading, mainError} = state;
  return (
    <div data-testid="error-wrap" className="errorWrap">
      {isLoading && <Spinner className="spinner" />}
      {mainError && (
        <span data-testid="main-error" className="error">
          {mainError}
        </span>
      )}
    </div>
  );
}

import React from 'react';
import { Spinner } from '../spinner/spinner';
import './form-status-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function FormStatus(props: Props) {
  return (
    <div className="errorWrap">
      <Spinner className="spinner" />
      <span className="error">Error</span>
    </div>
  );
}

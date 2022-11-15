import React, { useContext } from 'react';
import { CreateContextForm } from '../../contexs/form/form-context';
import './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: Props) {
  const { errorState } = useContext(CreateContextForm);
  const error = errorState[`${props.name}`];

  function getStatus(): string {
    return '🔴';
  }

  function getTitle(): string {
    return error;
  }

  return (
    <div className="inputWrap">
      <input {...props} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className="status"
      >
        {getStatus()}
      </span>
    </div>
  );
}

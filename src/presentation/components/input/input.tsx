import React, { useContext } from 'react';
import { CreateContextForm } from '../../contexs/form/form-context';
import './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: Props) {
  const { state, setState } = useContext(CreateContextForm);
  const error = state[`${props.name}Error`];

  function getStatus(): string {
    return '🔴';
  }

  function getTitle(): string {
    return error;
  }

  function handleChange(
    event: React.FocusEvent<HTMLInputElement>
  ): void {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="inputWrap">
      <input
        {...props}
        data-testid={props.name}
        onChange={handleChange}
      />
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

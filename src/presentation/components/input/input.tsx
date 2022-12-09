import React, {RefObject, useContext, useRef} from 'react';
import {CreateContextForm} from '../../contexs/form/form-context';
import './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: Props) {
  const {state, setState} = useContext(CreateContextForm);
  const inputRef = useRef() as RefObject<HTMLInputElement>;
  const error = state[`${props.name}Error`];

  return (
    <div className="inputWrap">
      <input
        {...props}
        ref={inputRef}
        data-testid={props.name}
        placeholder=" "
        onChange={(e) => {
          setState({
            ...state,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <label
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo ok!'}
        className="status"
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
}

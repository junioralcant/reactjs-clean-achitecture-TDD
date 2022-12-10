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
    <div
      data-testid={`${props.name}-wrap`}
      className="inputWrap"
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
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
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current?.focus();
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  );
}

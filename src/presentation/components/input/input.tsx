import React from 'react';
import './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: Props) {
  return (
    <div className="inputWrap">
      <input {...props} />
      <span className="status">🔴</span>
    </div>
  );
}

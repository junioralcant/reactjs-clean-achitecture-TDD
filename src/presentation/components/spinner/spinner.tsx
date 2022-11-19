import React from 'react';
import './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

export function Spinner(props: Props) {
  return (
    <div
      {...props}
      className={`spinner ${props.className}`}
      data-testid="spinner"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

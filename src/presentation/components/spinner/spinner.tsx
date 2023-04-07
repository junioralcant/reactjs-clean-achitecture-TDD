import React from 'react';
import './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

export function Spinner(props: Props) {
  const negativeClass = props.isNegative ? 'negative' : '';
  return (
    <div
      {...props}
      className={`spinner ${props.className} ${negativeClass}`}
      data-testid="spinner"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

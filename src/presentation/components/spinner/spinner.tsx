import React from 'react';
import './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

export function Spinner({isNegative, ...props}: Props) {
  const negativeClass = isNegative ? 'negative' : '';
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

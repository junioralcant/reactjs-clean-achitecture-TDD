import {render, screen} from '@testing-library/react';
import {Calendar} from './calendar';

function makeSut(date: Date) {
  render(<Calendar date={date} />);
}

describe('Calendar  Component', () => {
  it('Should render with correct values', () => {
    makeSut(new Date('2022-12-30T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('30');
    expect(screen.getByTestId('month')).toHaveTextContent('dez');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });

  it('Should render with correct values', () => {
    makeSut(new Date('2021-05-12T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('12');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2021');
  });
});

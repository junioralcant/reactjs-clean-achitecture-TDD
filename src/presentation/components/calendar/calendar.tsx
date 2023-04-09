import './calendar-styles.scss';

type Props = {
  date: Date;
  className?: string;
};

export function Calendar({date, className}: Props) {
  return (
    <time className={`calendarWrap ${className}`}>
      <span data-testid="day" className="day">
        {date.getDate()}
      </span>
      <span data-testid="month" className="month">
        {date
          .toLocaleString('pt-BR', {month: 'short'})
          .replace('.', '')}
      </span>
      <span data-testid="year" className="year">
        {date.getFullYear()}
      </span>
    </time>
  );
}

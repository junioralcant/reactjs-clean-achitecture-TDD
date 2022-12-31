import {SurveyModel} from '../../../../../domain/models';
import {Icon, IconName} from '../../../../components/icon/icon';

import './item-styles.scss';

type Props = {
  survey: SurveyModel;
};

export function SurveyItem({survey}: Props) {
  const iconName = survey.didAnswer
    ? IconName.thumbUp
    : IconName.thumbDown;

  return (
    <li className="surveyItemWrap">
      <div className="surveyContent">
        <Icon className="iconWrap" iconName={iconName} />
        <time>
          <span data-testid="day" className="day">
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className="month">
            {survey.date
              .toLocaleString('pt-BR', {month: 'short'})
              .replace('.', '')}
          </span>
          <span data-testid="year" className="year">
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}

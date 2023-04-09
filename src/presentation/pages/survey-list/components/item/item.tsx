import {ILoadSurveyList} from '../../../../../domain/useCases';
import {Calendar} from '../../../../components/calendar/calendar';
import {Icon, IconName} from '../../../../components/icon/icon';

import './item-styles.scss';

type Props = {
  survey: ILoadSurveyList.Model;
};

export function SurveyItem({survey}: Props) {
  const iconName = survey.didAnswer
    ? IconName.thumbUp
    : IconName.thumbDown;

  return (
    <li className="surveyItemWrap">
      <div className="surveyContent">
        <Icon className="iconWrap" iconName={iconName} />
        <Calendar date={survey.date} className="calendarWrap" />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}

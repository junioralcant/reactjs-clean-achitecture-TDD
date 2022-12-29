import {Icon, IconName} from '../../../../components/icon/icon';

import './survey-item-styles.scss';

export function SurveyItem() {
  return (
    <li className="surveyItemWrap">
      <div className="surveyContent">
        <Icon className="iconWrap" iconName={IconName.thumbUp} />
        <time>
          <span className="day">22</span>
          <span className="month">03</span>
          <span className="year">2022</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}

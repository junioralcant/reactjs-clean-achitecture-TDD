import {useContext} from 'react';
import {SurveyModel} from '../../../../../domain/models';
import {CreateContextSurvey} from '../contex/contex';
import {SurveyItemEmpty} from '../item-empty/item-empty';
import {SurveyItem} from '../item/item';
import './list-styles.scss';

export function ListItem() {
  const {state} = useContext(CreateContextSurvey);

  return (
    <ul className="listWrap" data-testid="survey-list">
      {state.surveys?.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
}

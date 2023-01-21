import {useContext} from 'react';
import {ILoadSurveyList} from '../../../../../domain/useCases';
import {CreateContextSurvey} from '../contex/contex';
import {SurveyItemEmpty} from '../item-empty/item-empty';
import {SurveyItem} from '../item/item';
import './list-styles.scss';

export function ListItem() {
  const {state} = useContext(CreateContextSurvey);

  return (
    <ul className="listWrap" data-testid="survey-list">
      {state.surveys?.length ? (
        state.surveys.map((survey: ILoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
}

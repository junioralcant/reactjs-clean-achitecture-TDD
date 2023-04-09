import {ILoadSurveyList} from '../../../../../domain/useCases';
import {SurveyItemEmpty} from '../item-empty/item-empty';
import {SurveyItem} from '../item/item';
import './list-styles.scss';

type Props = {
  surveys: ILoadSurveyList.Model[] | undefined;
};

export function ListItem({surveys}: Props) {
  return (
    <ul className="listWrap" data-testid="survey-list">
      {surveys?.length ? (
        surveys.map((survey: ILoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
}

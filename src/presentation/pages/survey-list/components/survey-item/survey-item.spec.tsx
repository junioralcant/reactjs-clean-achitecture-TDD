import {render, screen} from '@testing-library/react';
import {mockSurveyModel} from '../../../../../domain/test';
import {IconName} from '../../../../components/icon/icon';
import {SurveyItem} from './survey-item';

describe('SurveyItem Component', () => {
  it('Should render with correct values', () => {});
  const survey = mockSurveyModel();
  survey.didAnswer = true;
  survey.date = new Date('2022-12-30T00:00:00');
  render(<SurveyItem survey={survey} />);

  expect(screen.getByTestId('icon')).toHaveProperty(
    'src',
    IconName.thumbUp
  );
  expect(screen.getByTestId('question')).toHaveTextContent(
    survey.question
  );

  expect(screen.getByTestId('day')).toHaveTextContent('30');
  expect(screen.getByTestId('month')).toHaveTextContent('dez');
  expect(screen.getByTestId('year')).toHaveTextContent('2022');
});

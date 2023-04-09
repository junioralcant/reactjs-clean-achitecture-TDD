import {render, screen} from '@testing-library/react';
import {mockSurveyModel} from '../../../../../domain/test';
import {IconName} from '../../../../components/icon/icon';
import {SurveyItem} from './item';

function makeSut(survey = mockSurveyModel()) {
  render(<SurveyItem survey={survey} />);
}

describe('SurveyItem Component', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbUp
    );
    expect(screen.getByTestId('question')).toHaveTextContent(
      survey.question
    );
  });

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(
      survey.question
    );
  });
});

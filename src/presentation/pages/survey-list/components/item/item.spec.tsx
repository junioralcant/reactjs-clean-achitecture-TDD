import {fireEvent, render, screen} from '@testing-library/react';
import {mockSurveyModel} from '../../../../../domain/test';
import {IconName} from '../../../../components/icon/icon';
import {SurveyItem} from './item';

function makeSut(survey = mockSurveyModel()) {
  render(<SurveyItem survey={survey} />);
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SurveyItem Component', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-12-30T00:00:00'),
    });
    makeSut(survey);

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

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2021-05-12T00:00:00'),
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(
      survey.question
    );

    expect(screen.getByTestId('day')).toHaveTextContent('12');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2021');
  });

  it('Should go to SurveyResult', () => {
    const survey = mockSurveyModel();
    makeSut(survey);

    fireEvent.click(screen.getByTestId('link'));

    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `/surveys/${survey.id}`
    );
  });
});

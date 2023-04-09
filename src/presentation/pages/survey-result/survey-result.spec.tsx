import {render, screen, waitFor} from '@testing-library/react';
import {SurveyResult} from './survey-result';
import {LoadSurveyResultSpy} from '../../../domain/test';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

function makeSut(): SutTypes {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  render(<SurveyResult loadSurveyResult={loadSurveyResultSpy} />);

  return {
    loadSurveyResultSpy,
  };
}

describe('SurveyResult Component', () => {
  it('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  it('Should call LoadSurveyResult', async () => {
    const {loadSurveyResultSpy} = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });
});

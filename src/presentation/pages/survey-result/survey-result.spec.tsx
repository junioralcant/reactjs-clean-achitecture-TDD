import {render, screen} from '@testing-library/react';
import {SurveyResult} from './survey-result';

function makeSut() {
  render(<SurveyResult />);
}

describe('SurveyResult Component', () => {
  it('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});

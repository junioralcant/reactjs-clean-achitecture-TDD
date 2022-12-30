import {render, screen} from '@testing-library/react';
import {SurveyList} from './survey-list';

function makeSut(): void {
  render(<SurveyList />);
}

describe('SurveyzList Component', () => {
  it('Should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});

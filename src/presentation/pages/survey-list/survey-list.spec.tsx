import {render, screen} from '@testing-library/react';
import {SurveyList} from './survey-list';

describe('SurveyzList Component', () => {
  it('Should present 4 empty items on start', () => {
    render(<SurveyList />);
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});

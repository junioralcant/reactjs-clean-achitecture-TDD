import {render, screen, waitFor} from '@testing-library/react';
import {SurveyModel} from '../../../domain/models';
import {mockSurveyListModel} from '../../../domain/test';
import {ILoadSurveyList} from '../../../domain/useCases';
import {SurveyList} from './survey-list';

class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<SurveyModel[] | undefined> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

function makeSut(): SutTypes {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return {
    loadSurveyListSpy,
  };
}

describe('SurveyzList Component', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
    await waitFor(() => surveyList);
  });

  it('Should call LoadSurveyList', async () => {
    const {loadSurveyListSpy} = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByText('Enquetes'));
  });

  it('Should render SurveyItems on sucess', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() =>
      expect(
        surveyList.querySelectorAll('li.surveyItemWrap').length
      ).toBe(3)
    );
  });
});

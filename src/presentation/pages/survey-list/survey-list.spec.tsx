import {render, screen} from '@testing-library/react';
import {SurveyModel} from '../../../domain/models';
import {ILoadSurveyList} from '../../../domain/useCases';
import {SurveyList} from './survey-list';

class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[] | undefined> {
    this.callsCount++;
    return [];
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
  it('Should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  it('Should call LoadSurveyList', () => {
    const {loadSurveyListSpy} = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});

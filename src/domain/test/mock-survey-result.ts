import {faker} from '@faker-js/faker';
import {RemoteLoadSurveyResult} from '../../data/useCases/load-survey-result/load-survey-result';
import {ILoadSurveyResult} from '../useCases/load-survey-result';
import {ISaveSurveyResult} from '../useCases';
import {RemoteSaveSurveyResult} from '../../data/useCases/save-survey-result/remote-save-survey-result.usecase';

export function mockSaveResultParams(): ISaveSurveyResult.Params {
  return {
    answers: faker.random.words(),
  };
}

export function mockSurveyResultModel(): RemoteLoadSurveyResult.Model {
  return {
    question: faker.random.word(),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.image.imageUrl(),
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: true,
      },
      {
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: false,
      },
    ],
  };
}

export function mockSurveyResultModelSave(): RemoteSaveSurveyResult.Model {
  return {
    question: faker.random.word(),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.image.imageUrl(),
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: true,
      },
      {
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: false,
      },
    ],
  };
}

export class LoadSurveyResultSpy implements ILoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async load(): Promise<ILoadSurveyResult.Model | undefined> {
    this.callsCount++;
    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements ISaveSurveyResult {
  params: ISaveSurveyResult.Params = {
    answers: '',
  };
  surveyResult = mockSurveyResultModel();

  async save(
    params: ISaveSurveyResult.Params
  ): Promise<ISaveSurveyResult.Model | undefined> {
    this.params = params;
    return this.surveyResult;
  }
}

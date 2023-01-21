import {faker} from '@faker-js/faker';
import {ILoadSurveyList} from '../useCases';

export function mockSurveyModel(): ILoadSurveyList.Model {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.word(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent(),
  };
}

export function mockSurveyListModel(): ILoadSurveyList.Model[] {
  return [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];
}

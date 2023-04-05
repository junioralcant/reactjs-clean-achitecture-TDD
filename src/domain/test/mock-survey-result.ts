import {faker} from '@faker-js/faker';
import {ILoadSurveyResult} from '../useCases/load-survey-result';
import {RemoteLoadSurveyResult} from '../../data/useCases/load-survey-result/load-survey-result';

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
      },
      {
        answer: faker.random.words(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
      },
    ],
  };
}

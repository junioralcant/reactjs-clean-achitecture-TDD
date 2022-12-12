import {faker} from '@faker-js/faker';
import {SurveyModel} from '../models';

export function mockSurveyListModel(): SurveyModel[] {
  return [
    {
      id: faker.datatype.uuid(),
      question: faker.random.word(),
      answers: [
        {
          answer: faker.random.word(),
          image: faker.internet.url(),
        },
      ],
      didAnswer: faker.datatype.boolean(),
      date: faker.date.recent(),
    },
  ];
}

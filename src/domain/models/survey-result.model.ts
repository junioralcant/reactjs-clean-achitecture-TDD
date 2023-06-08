export type SurveyResultModel = {
  question: string;
  date: Date;
  answers: SurveyResultAnswersModel[];
};

export type SurveyResultAnswersModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};

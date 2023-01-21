export interface ILoadSurveyList {
  loadAll(): Promise<ILoadSurveyList.Model[] | undefined>;
}

export namespace ILoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: Date;
    didAnswer: boolean;
  };
}

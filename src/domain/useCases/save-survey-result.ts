import {SurveyResultModel} from '../models/';

export interface ISurveyResult {
  load(
    params: ISurveyResult.Params
  ): Promise<ISurveyResult.Model | undefined>;
}

export namespace ISurveyResult {
  export type Params = {
    answers: string;
  };

  export type Model = SurveyResultModel;
}

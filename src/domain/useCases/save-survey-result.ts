import {SurveyResultModel} from '../models/';

export interface ISaveSurveyResult {
  save(
    params: ISaveSurveyResult.Params
  ): Promise<ISaveSurveyResult.Model | undefined>;
}

export namespace ISaveSurveyResult {
  export type Params = {
    answers: string;
  };

  export type Model = SurveyResultModel;
}

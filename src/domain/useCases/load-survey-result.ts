import {SurveyResultModel} from '../models';

export interface ILoadSurveyResult {
  load(): Promise<ILoadSurveyResult.Model | undefined>;
}

export namespace ILoadSurveyResult {
  export type Model = SurveyResultModel;
}

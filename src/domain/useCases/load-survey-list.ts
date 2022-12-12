import {SurveyModel} from '../models';

export interface ILoadSurveyList {
  loadAll(): Promise<SurveyModel>;
}

import {HttpReponse} from '.';

export type HttpPostParams = {
  url: string;
  body?: any;
};

export interface IHttpPostClient<ResponseType = any> {
  post(data: HttpPostParams): Promise<HttpReponse<ResponseType>>;
}

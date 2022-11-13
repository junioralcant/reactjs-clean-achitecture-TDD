import { HttpReponse } from './http-response';

export type HttpPostParams = {
  url: string;
  body?: object;
};

export interface IHttpPostClient {
  post(data: HttpPostParams): Promise<HttpReponse>;
}

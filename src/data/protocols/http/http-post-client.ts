import { HttpReponse } from './http-response';

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface IHttpPostClient<T, R> {
  post(data: HttpPostParams<T>): Promise<HttpReponse<R>>;
}

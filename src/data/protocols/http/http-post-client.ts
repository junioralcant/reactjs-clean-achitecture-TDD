import { HttpReponse } from '.';

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface IHttpPostClient<T, R> {
  post(data: HttpPostParams<T>): Promise<HttpReponse<R>>;
}

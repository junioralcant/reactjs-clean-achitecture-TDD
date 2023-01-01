import {HttpReponse} from './http-response';

export type HttpGetParams = {
  url: string;
  headers?: any;
};

export interface IHttpGetClient<ResponseType = any> {
  get(params: HttpGetParams): Promise<HttpReponse<ResponseType>>;
}

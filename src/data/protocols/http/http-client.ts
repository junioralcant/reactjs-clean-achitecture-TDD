export type HttpClientRequest = {
  url: string;
  method: HttpMethod;
  headers?: any;
  body?: any;
};

export interface IHttpClient<ResponseType = any> {
  request(
    data: HttpClientRequest
  ): Promise<HttpResponse<ResponseType>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<BodyType = any> = {
  statusCode: HttpStatusCode;
  body?: BodyType;
};

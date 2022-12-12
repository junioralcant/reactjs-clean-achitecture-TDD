export type HttpGetParams = {
  url: string;
};

export interface IHttpGetClient {
  get(params: HttpGetParams): Promise<void>;
}

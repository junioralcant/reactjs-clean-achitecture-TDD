export type HttpPostParams = {
  url: string;
};

export interface IHttpPostClient {
  post(data: HttpPostParams): Promise<void>;
}

import {
  HttpGetParams,
  HttpPostParams,
  HttpReponse,
  IHttpGetClient,
  IHttpPostClient,
} from '../../../data/protocols/http';
import axios, {AxiosResponse} from 'axios';

export class AxiosHttpClient
  implements IHttpPostClient, IHttpGetClient
{
  async post({url, body}: HttpPostParams): Promise<HttpReponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.post(url, body);
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return this.adapt(axiosResponse);
  }

  async get(params: HttpGetParams): Promise<HttpReponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.get(params.url, {
        headers: params.headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpReponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

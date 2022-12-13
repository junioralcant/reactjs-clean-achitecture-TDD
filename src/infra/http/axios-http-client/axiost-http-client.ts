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

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }

  async get(params: HttpGetParams): Promise<HttpReponse> {
    const axiostResponse = await axios.get(params.url);
    return {
      statusCode: axiostResponse.status,
      body: axiostResponse.data,
    };
  }
}

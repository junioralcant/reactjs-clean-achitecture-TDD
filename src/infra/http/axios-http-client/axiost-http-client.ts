import {
  HttpClientRequest,
  HttpResponse,
  IHttpClient,
} from '../../../data/protocols/http';
import axios, {AxiosResponse} from 'axios';

export class AxiosHttpClient implements IHttpClient, IHttpClient {
  async request(data: HttpClientRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        method: data.method,
        headers: data.headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

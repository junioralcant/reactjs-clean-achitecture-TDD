import {
  HttpPostParams,
  HttpReponse,
  IHttpPostClient,
} from '../../../data/protocols/http';
import axios, {AxiosResponse} from 'axios';

export class AxiosHttpClient implements IHttpPostClient<any> {
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
}

import {
  HttpPostParams,
  HttpReponse,
  IHttpPostClient,
} from '../../../data/protocols/http';
import axios, {AxiosResponse} from 'axios';

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post({
    url,
    body,
  }: HttpPostParams<any>): Promise<HttpReponse<any>> {
    let respose: AxiosResponse<any>;

    try {
      respose = await axios.post(url, body);
    } catch (error: any) {
      respose = error.response;
    }

    return {
      statusCode: respose.status,
      body: respose.data,
    };
  }
}

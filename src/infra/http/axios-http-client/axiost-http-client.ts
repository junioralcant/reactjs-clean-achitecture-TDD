import {
  HttpPostParams,
  HttpReponse,
  IHttpPostClient,
} from '../../../data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post({
    url,
    body,
  }: HttpPostParams<any>): Promise<HttpReponse<any>> {
    const respose = await axios.post(url, body);
    return {
      statusCode: respose.status,
      body: respose.data,
    };
  }
}

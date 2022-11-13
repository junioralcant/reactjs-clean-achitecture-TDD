import { HttpPostParams } from '../../../data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    console.log(params.url);
    await axios.post(params.url);
  }
}

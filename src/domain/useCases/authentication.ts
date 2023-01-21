import {AccountModel} from '../models';

export interface IAuthentication {
  auth(
    params: IAuthentication.Params
  ): Promise<IAuthentication.Model | undefined>;
}

export namespace IAuthentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Model = AccountModel;
}

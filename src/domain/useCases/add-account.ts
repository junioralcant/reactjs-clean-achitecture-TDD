import {AccountModel} from '../models';

export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export interface IAddAccount {
  add(params: IAddAccount.Params): Promise<IAddAccount.Model>;
}

export namespace IAddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  export type Model = AccountModel;
}

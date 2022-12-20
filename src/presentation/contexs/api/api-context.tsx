import {createContext} from 'react';
import {AccountModel} from '../../../domain/models';

type Props = {
  setCurrentAccount(account: AccountModel | undefined): void;
  getCurrentAccount?(): AccountModel;
};

export const ApiContext = createContext<Props>(null as any);

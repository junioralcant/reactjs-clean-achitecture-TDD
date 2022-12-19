import {createContext} from 'react';
import {AccountModel} from '../../../domain/models';

type Props = {
  setCurrentAccount(account: AccountModel | undefined): void;
};

export const ApiContext = createContext<Props>(null as any);

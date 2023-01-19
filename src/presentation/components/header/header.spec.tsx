import {fireEvent, render, screen} from '@testing-library/react';
import {AccountModel} from '../../../domain/models';
import {mockAccountModel} from '../../../domain/test';
import {ApiContext} from '../../contexs/api/api-context';
import {Header} from './header';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void;
};

function makeSut(account = mockAccountModel()): SutTypes {
  const setCurrentAccountMock = jest.fn();

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account,
      }}
    >
      <Header />
    </ApiContext.Provider>
  );
  return {
    setCurrentAccountMock,
  };
}

describe('Header Component', () => {
  it('Should call setCurrentAccount with null value', () => {
    const {setCurrentAccountMock} = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  it('Should reder username correctly', () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId('username')).toHaveTextContent(
      account.name
    );
  });
});

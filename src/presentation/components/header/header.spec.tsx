import {fireEvent, render, screen} from '@testing-library/react';
import {mockAccountModel} from '../../../domain/test';
import {ApiContext} from '../../contexs/api/api-context';
import {Header} from './header';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Header Component', () => {
  it('Should call setCurrentAccount with null value', () => {
    const setCurrentAccountMock = jest.fn();

    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountMock,
          getCurrentAccount: mockAccountModel,
        }}
      >
        <Header />
      </ApiContext.Provider>
    );

    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });
});

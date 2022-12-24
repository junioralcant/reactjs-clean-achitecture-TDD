import {render} from '@testing-library/react';
import {MemoryHistory} from 'history';
import {createMemoryHistory} from 'history';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import {mockAccountModel} from '../../domain/test';
import {ApiContext} from '../../presentation/contexs/api/api-context';
import {Login} from '../../presentation/pages/login/login';
import {
  AuthenticationSpy,
  ValidationStub,
} from '../../presentation/test';
import {PrivateRouter} from './private-route';

type SutType = {
  history: MemoryHistory;
};

function mackSut(account: any = mockAccountModel()): SutType {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();

  const history = createMemoryHistory({initialEntries: ['/']});
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: () => null,
        getCurrentAccount: () => account,
      }}
    >
      {/* @ts-expect-error */}
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Login
                  authentication={authenticationSpy}
                  validation={validationStub}
                />
              </PrivateRouter>
            }
          />

          <Route
            path="/login"
            element={
              <Login
                authentication={authenticationSpy}
                validation={validationStub}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    </ApiContext.Provider>
  );

  return {history};
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    const {history} = mackSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  it('Should render corrent componet if token is not empty', () => {
    const {history} = mackSut();
    expect(history.location.pathname).toBe('/');
  });
});

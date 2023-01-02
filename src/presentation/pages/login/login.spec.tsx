import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import {Login} from './login';
import {Helper, ValidationStub} from '../../test';
import {InvalidCredentilsError} from '../../../domain/errors';
import {BrowserRouter} from 'react-router-dom';
import {ApiContext} from '../../contexs/api/api-context';
import {getCurrentAccountAdapter} from '../../../main/adapters/current-account-adapter';
import {IAuthentication} from '../../../domain/useCases';
import {AuthenticationSpy} from '../../../domain/test';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock(account: IAuthentication.Model): void;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  validationStub.setMessageError(params?.validationError as string);

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </BrowserRouter>
    </ApiContext.Provider>
  );

  return {
    authenticationSpy,
    setCurrentAccountMock,
  };
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

function simulateValidSubmit(
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  Helper.populateField('email', email);
  Helper.populateField('password', password);

  const submitButton = screen.getByTestId('submit');
  fireEvent.click(submitButton);
}

describe('Login Component', () => {
  it('Should start with intial state', () => {
    const validationError = faker.internet.domainWord();

    makeSut({validationError});

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('email');

    Helper.testStatusForField('email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('password');

    Helper.testStatusForField('password', validationError);
  });

  it('Should show valid email state if validation succeeds', () => {
    const validationError = '';
    makeSut();

    Helper.populateField('email');

    Helper.testStatusForField('password', validationError);
  });

  it('Should show valid password state if validation succeeds', () => {
    const validationError = '';
    makeSut();

    Helper.populateField('password');

    Helper.testStatusForField('password', validationError);
  });

  it('Should enble submit button if form is valid', () => {
    makeSut();

    Helper.populateField('email');
    Helper.populateField('password');

    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  it('Should show spinner on submit', () => {
    makeSut();

    simulateValidSubmit();

    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  it('Should call Authentication with correct values', () => {
    const {authenticationSpy} = makeSut();

    const email = faker.internet.email();

    const password = faker.internet.password();

    simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('Should call Authentication only once', () => {
    const {authenticationSpy} = makeSut();

    simulateValidSubmit();
    simulateValidSubmit();

    expect(authenticationSpy.getCallsCount()).toBe(1);
  });

  it('Should not call Authentication if form is invalid', () => {
    const validationError = faker.internet.domainWord();
    const {authenticationSpy} = makeSut({validationError});

    Helper.populateField('email');
    fireEvent.submit(screen.getByTestId('form'));

    expect(authenticationSpy.getCallsCount()).toBe(0);
  });

  it('Should present error if Authentication fails', async () => {
    const {authenticationSpy} = makeSut();
    const error = new InvalidCredentilsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockRejectedValueOnce(error);

    simulateValidSubmit();

    await waitFor(() => {
      expect(screen.getByTestId('main-error')).toHaveTextContent(
        error.message
      );
    });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  it('Should call SaveAccessToken on sucess', async () => {
    const {authenticationSpy, setCurrentAccountMock} = makeSut();

    simulateValidSubmit();

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(
        authenticationSpy.account
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('Should go to signup page', async () => {
    makeSut();
    const signupButton = screen.getByTestId('signup-link');
    fireEvent.click(signupButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});

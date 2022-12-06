import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import {Login} from './login';
import {
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock,
  ValidationStub,
} from '../../test';
import {InvalidCredentilsError} from '../../../domain/errors';
import {BrowserRouter} from 'react-router-dom';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.setMessageError(params?.validationError as string);

  const sut = render(
    <BrowserRouter>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </BrowserRouter>
  );

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

function simulateValidSubmit(
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);

  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
}

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should start with intial state', () => {
    const validationError = faker.internet.domainWord();

    const {sut} = makeSut({validationError});

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'email');

    Helper.testStatusForField(sut, 'email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'password');

    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('Should show valid email state if validation succeeds', () => {
    const validationError = '';
    const {sut} = makeSut();

    Helper.populateField(sut, 'email');

    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('Should show valid password state if validation succeeds', () => {
    const validationError = '';
    const {sut} = makeSut();

    Helper.populateField(sut, 'password');

    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('Should enble submit button if form is valid', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');

    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('Should show spinner on submit', () => {
    const {sut} = makeSut();

    simulateValidSubmit(sut);

    Helper.testElementExists(sut, 'spinner');
  });

  it('Should call Authentication with correct values', () => {
    const {sut, authenticationSpy} = makeSut();

    const email = faker.internet.email();

    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('Should call Authentication only once', () => {
    const {sut, authenticationSpy} = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.getCallsCount()).toBe(1);
  });

  it('Should call Authentication if form is invalid', () => {
    const validationError = faker.internet.domainWord();
    const {sut, authenticationSpy} = makeSut({validationError});

    Helper.populateField(sut, 'email');
    fireEvent.submit(sut.getByTestId('form'));

    expect(authenticationSpy.getCallsCount()).toBe(0);
  });

  it('Should present error if Authentication fails', async () => {
    const {sut, authenticationSpy} = makeSut();
    const error = new InvalidCredentilsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockRejectedValueOnce(error);

    simulateValidSubmit(sut);

    await waitFor(() => {
      const mainError = sut.getByTestId('main-error');
      expect(mainError.textContent).toBe(error.message);
    });

    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  it('Should call SaveAccessToken on sucess', async () => {
    const {sut, authenticationSpy, saveAccessTokenMock} = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => {
      expect(saveAccessTokenMock.accesssToken).toBe(
        authenticationSpy.account.accessToken
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('Should present error if SaveAccessToken fails', async () => {
    const {sut, saveAccessTokenMock} = makeSut();
    const error = new InvalidCredentilsError();

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockRejectedValueOnce(error);

    simulateValidSubmit(sut);

    await waitFor(() => {
      const mainError = sut.getByTestId('main-error');
      expect(mainError.textContent).toBe(error.message);
    });

    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  it('Should go to signup page', async () => {
    const {sut} = makeSut();
    const signupButton = sut.getByTestId('signup');
    fireEvent.click(signupButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});

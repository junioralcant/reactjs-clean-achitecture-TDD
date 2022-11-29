import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import 'jest-localstorage-mock';
import {ValidationStub} from '../../test';
import {Login} from './login';
import {AuthenticationSpy} from '../../test';
import {InvalidCredentilsError} from '../../../domain/errors';
import {BrowserRouter} from 'react-router-dom';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();

  validationStub.setMessageError(params?.validationError as string);

  const sut = render(
    <BrowserRouter>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
      />
    </BrowserRouter>
  );

  return {
    sut,
    authenticationSpy,
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
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
}

function populateEmailField(
  sut: RenderResult,
  email = faker.internet.email()
): void {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {target: {value: email}});
}

function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password()
): void {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {target: {value: password}});
}

describe('Login Component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  it('Should start with intial state', () => {
    const validationError = faker.internet.domainWord();

    const {sut} = makeSut({validationError});

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    populateEmailField(sut);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    populatePasswordField(sut);

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show valid email state if validation succeeds', () => {
    const {sut} = makeSut();

    populateEmailField(sut);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo ok!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('Should show valid password state if validation succeeds', () => {
    const {sut} = makeSut();

    populatePasswordField(sut);

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo ok!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('Should enble submit button if form is valid', () => {
    const {sut} = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('Should show spinner on submit', () => {
    const {sut} = makeSut();

    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
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

    populateEmailField(sut);
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

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(1);
  });

  it('Should add accessToken to localstorage on success', async () => {
    const {sut, authenticationSpy} = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'accessToken',
        authenticationSpy.account.accessToken
      );
    });
  });

  it('Should add accessToken to localstorage on success', async () => {
    const {sut, authenticationSpy} = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'accessToken',
        authenticationSpy.account.accessToken
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('Should go to signup page', async () => {
    const {sut} = makeSut();
    const signupButton = sut.getByTestId('signup');
    fireEvent.click(signupButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
  });
});

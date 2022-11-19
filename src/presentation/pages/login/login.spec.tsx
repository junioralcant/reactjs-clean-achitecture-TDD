import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { ValidationStub } from '../../test';
import { Login } from './login';
import {
  AuthenticationParams,
  IAuthentication,
} from '../../../domain/useCases';
import { AccountModel } from '../../../domain/models';
import { mockAccountModel } from '../../../domain/test';

class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel();
  params: AuthenticationParams = {
    email: '',
    password: '',
  };

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return this.account;
  }
}

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
    <Login
      validation={validationStub}
      authentication={authenticationSpy}
    />
  );

  return {
    sut,
    authenticationSpy,
  };
}

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should start with intial state', () => {
    const validationError = faker.internet.domainWord();

    const { sut } = makeSut({ validationError });

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

    const { sut } = makeSut({ validationError });

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();

    const { sut } = makeSut({ validationError });

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo ok!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo ok!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('Should enble submit button if form is valid', () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('Should show spinner on submit', () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);

    const spinner = sut.container.getElementsByClassName('spinner');
    expect(spinner).toBeTruthy();
  });

  it('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { ValidationStub } from '../../test';
import { Login } from './login';
import { AuthenticationSpy } from '../../test';

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
  fireEvent.input(emailInput, { target: { value: email } });
}

function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password()
): void {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
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

    populateEmailField(sut);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo ok!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo ok!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('Should enble submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('Should show spinner on submit', () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);

    const spinner = sut.container.getElementsByClassName('spinner');
    expect(spinner).toBeTruthy();
  });

  it('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();

    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.getCallsCount()).toBe(1);
  });

  it('Should call Authentication if form is invalid', () => {
    const validationError = faker.internet.domainWord();
    const { sut, authenticationSpy } = makeSut({ validationError });

    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('form'));

    expect(authenticationSpy.getCallsCount()).toBe(0);
  });
});

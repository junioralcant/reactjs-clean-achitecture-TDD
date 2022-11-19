import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { IValidation } from '../../protocols/validation';
import { ValidationStub } from '../../test';
import { Login } from './login';

type SutTypes = {
  sut: RenderResult;
  validationStub: IValidation;
};

function makeSut(): SutTypes {
  const validationStub = new ValidationStub();
  const errorMessage = faker.internet.domainWord();
  validationStub.setMessageError(errorMessage);
  const sut = render(<Login validation={validationStub} />);
  return {
    sut,
    validationStub,
  };
}

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should start with intial state', () => {
    const { sut, validationStub } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.getMessageError());
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(
      validationStub.getMessageError()
    );
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();

    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.getMessageError());
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();

    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(
      validationStub.getMessageError()
    );
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.setMessageError('');
    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo ok!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.setMessageError('');
    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo ok!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('Should enble submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();

    validationStub.setMessageError('');

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
});

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { IValidation } from '../../protocols/validation';
import { ValidationSpy } from '../../test';
import { Login } from './login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: IValidation;
};

function makeSut(): SutTypes {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
}

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should start with intial state', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId(
      'submit'
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should call Validation with correct value email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.getFieldName()).toBe('email');
    expect(validationSpy.getFieldValue()).toBe(email);
  });

  it('Should call Validation with correct value password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, {
      target: { value: password },
    });
    expect(validationSpy.getFieldName()).toBe('password');
    expect(validationSpy.getFieldValue()).toBe(password);
  });
});

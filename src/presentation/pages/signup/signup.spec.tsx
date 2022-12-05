import {render, RenderResult} from '@testing-library/react';
import {SignUp} from './signup';

type SutTypes = {
  sut: RenderResult;
};

function makeSut(): SutTypes {
  const sut = render(<SignUp />);

  return {
    sut,
  };
}

function testChildCount(
  sut: RenderResult,
  fieldName: string,
  count: number
): void {
  const el = sut.getByTestId(fieldName);

  expect(el.childElementCount).toBe(count);
}

function testButtonIsDisabled(
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void {
  const submitButton = sut.getByTestId(
    fieldName
  ) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
}

function testStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError: string
): void {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo ok!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
}

describe('Signup Component', () => {
  it('Should start with intial state', () => {
    const validationError = 'Campo obrigatório';

    const {sut} = makeSut();

    testChildCount(sut, 'error-wrap', 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});

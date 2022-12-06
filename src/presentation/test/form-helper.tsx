import {fireEvent, RenderResult} from '@testing-library/react';
import {faker} from '@faker-js/faker';

export function testChildCount(
  sut: RenderResult,
  fieldName: string,
  count: number
): void {
  const el = sut.getByTestId(fieldName);

  expect(el.childElementCount).toBe(count);
}

export function testButtonIsDisabled(
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void {
  const submitButton = sut.getByTestId(
    fieldName
  ) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
}

export function testStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo ok!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
}

export function populateField(
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, {target: {value: value}});
}

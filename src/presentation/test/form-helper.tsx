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
  validationError: string = ''
): void {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
}

export function populateField(
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, {target: {value: value}});
}

export function testElementExists(
  sut: RenderResult,
  fieldName: string
): void {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
}

export function testElementText(
  sut: RenderResult,
  fielName: string,
  text: string
): void {
  const el = sut.getByTestId(fielName);
  expect(el.textContent).toBe(text);
}

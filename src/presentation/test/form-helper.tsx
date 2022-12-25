import {fireEvent, screen} from '@testing-library/react';
import {faker} from '@faker-js/faker';

export function testChildCount(
  fieldName: string,
  count: number
): void {
  const el = screen.getByTestId(fieldName);

  expect(el.childElementCount).toBe(count);
}

export function testButtonIsDisabled(
  fieldName: string,
  isDisabled: boolean
): void {
  const submitButton = screen.getByTestId(
    fieldName
  ) as HTMLButtonElement;
  expect(submitButton.disabled).toBe(isDisabled);
}

export function testStatusForField(
  fieldName: string,
  validationError: string = ''
): void {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
}

export function populateField(
  fieldName: string,
  value = faker.random.word()
): void {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, {target: {value: value}});
}

export function testElementExists(fieldName: string): void {
  const el = screen.getByTestId(fieldName);
  expect(el).toBeTruthy();
}

export function testElementText(
  fielName: string,
  text: string
): void {
  const el = screen.getByTestId(fielName);
  expect(el.textContent).toBe(text);
}

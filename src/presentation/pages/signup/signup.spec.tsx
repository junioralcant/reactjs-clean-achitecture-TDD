import {render, RenderResult} from '@testing-library/react';
import {Helper} from '../../test';
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

describe('Signup Component', () => {
  it('Should start with intial state', () => {
    const validationError = 'Campo obrigatório';

    const {sut} = makeSut();

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(
      sut,
      'passwordConfirmation',
      validationError
    );
  });
});

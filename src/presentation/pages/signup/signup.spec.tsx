import {cleanup, render, RenderResult} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import {Helper, ValidationStub} from '../../test';
import {SignUp} from './signup';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError as string;
  const sut = render(<SignUp validation={validationStub} />);

  return {
    sut,
  };
}

describe('Signup Component', () => {
  afterEach(cleanup);
  it('Should start with intial state', () => {
    const validationError = faker.random.word();

    const {sut} = makeSut({validationError});

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório');
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório');
    Helper.testStatusForField(
      sut,
      'passwordConfirmation',
      'Campo obrigatório'
    );
  });

  it('Should show name error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'name');

    Helper.testStatusForField(sut, 'name', validationError);
  });
});

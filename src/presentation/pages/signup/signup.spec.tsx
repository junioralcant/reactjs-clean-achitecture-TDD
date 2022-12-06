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
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(
      sut,
      'passwordConfirmation',
      validationError
    );
  });

  it('Should show name error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'name');

    Helper.testStatusForField(sut, 'name', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'email');

    Helper.testStatusForField(sut, 'email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'password');

    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    const {sut} = makeSut({validationError});

    Helper.populateField(sut, 'passwordConfirmation');

    Helper.testStatusForField(
      sut,
      'passwordConfirmation',
      validationError
    );
  });

  it('Should show valid name state if validation succeeds', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name');
  });

  it('Should show valid email state if validation succeeds', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email');
  });
});

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import {
  AddAccountSpy,
  Helper,
  SaveAccessTokenMock,
  ValidationStub,
} from '../../test';
import {SignUp} from './signup';
import {EmailInUseError} from '../../../domain/errors';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  validationStub.errorMessage = params?.validationError as string;
  const sut = render(
    <SignUp
      validation={validationStub}
      addAccount={addAccountSpy}
      saveAccessToken={saveAccessTokenMock}
    />
  );

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock,
  };
}

function simulateValidSubmit(
  sut: RenderResult,
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  Helper.populateField(sut, 'name', name);
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  Helper.populateField(sut, 'passwordConfirmation', password);

  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

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

  it('Should show valid password state if validation succeeds', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password');
  });

  it('Should show valid passwordConfirmation state if validation succeeds', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation');
  });

  it('Should enble submit button if form is valid', () => {
    const {sut} = makeSut();

    Helper.populateField(sut, 'name');
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.populateField(sut, 'passwordConfirmation');

    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('Should show spinner on submit', () => {
    const {sut} = makeSut();

    simulateValidSubmit(sut);

    Helper.testElementExists(sut, 'spinner');
  });

  it('Should call AddAccount with correct values', () => {
    const {sut, addAccountSpy} = makeSut();

    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('Should call AddAccount only once', () => {
    const {sut, addAccountSpy} = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.internet.domainWord();
    const {sut, addAccountSpy} = makeSut({validationError});

    simulateValidSubmit(sut, '');

    expect(addAccountSpy.callsCount).toBe(0);
  });

  it('Should present error if AddAccount fails', async () => {
    const {sut, addAccountSpy} = makeSut();
    const error = new EmailInUseError();

    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);

    simulateValidSubmit(sut);

    await waitFor(() => {
      Helper.testElementText(sut, 'main-error', error.message);
    });

    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  it('Should call SaveAccessToken on sucess', async () => {
    const {sut, addAccountSpy, saveAccessTokenMock} = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => {
      expect(saveAccessTokenMock.accesssToken).toBe(
        addAccountSpy.account.accessToken
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});

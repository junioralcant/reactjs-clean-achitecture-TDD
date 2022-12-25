import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import {AddAccountSpy, Helper, ValidationStub} from '../../test';
import {SignUp} from './signup';
import {EmailInUseError} from '../../../domain/errors';
import {ApiContext} from '../../contexs/api/api-context';
import {AccountModel} from '../../../domain/models';
import {BrowserRouter} from 'react-router-dom';
import {getCurrentAccountAdapter} from '../../../main/adapters/current-account-adapter';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock(account: AccountModel): void;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();

  validationStub.errorMessage = params?.validationError as string;
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </BrowserRouter>
    </ApiContext.Provider>
  );

  return {
    addAccountSpy,
    setCurrentAccountMock,
  };
}

function simulateValidSubmit(
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', password);

  const submitButton = screen.getByTestId('submit');
  fireEvent.click(submitButton);
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Signup Component', () => {
  it('Should start with intial state', () => {
    const validationError = faker.random.word();

    makeSut({validationError});

    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisabled('submit', true);
    Helper.testStatusForField('name', validationError);
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
    Helper.testStatusForField(
      'passwordConfirmation',
      validationError
    );
  });

  it('Should show name error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('name');

    Helper.testStatusForField('name', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('email');

    Helper.testStatusForField('email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('password');

    Helper.testStatusForField('password', validationError);
  });

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.internet.domainWord();
    makeSut({validationError});

    Helper.populateField('passwordConfirmation');

    Helper.testStatusForField(
      'passwordConfirmation',
      validationError
    );
  });

  it('Should show valid name state if validation succeeds', () => {
    makeSut();

    Helper.populateField('name');
    Helper.testStatusForField('name');
  });

  it('Should show valid email state if validation succeeds', () => {
    makeSut();

    Helper.populateField('email');
    Helper.testStatusForField('email');
  });

  it('Should show valid password state if validation succeeds', () => {
    makeSut();

    Helper.populateField('password');
    Helper.testStatusForField('password');
  });

  it('Should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut();

    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation');
  });

  it('Should enble submit button if form is valid', () => {
    makeSut();

    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');

    Helper.testButtonIsDisabled('submit', false);
  });

  it('Should show spinner on submit', () => {
    makeSut();

    simulateValidSubmit();

    Helper.testElementExists('spinner');
  });

  it('Should call AddAccount with correct values', () => {
    const {addAccountSpy} = makeSut();

    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('Should call AddAccount only once', () => {
    const {addAccountSpy} = makeSut();

    simulateValidSubmit();
    simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.internet.domainWord();
    const {addAccountSpy} = makeSut({validationError});

    simulateValidSubmit('');

    expect(addAccountSpy.callsCount).toBe(0);
  });

  it('Should present error if AddAccount fails', async () => {
    const {addAccountSpy} = makeSut();
    const error = new EmailInUseError();

    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);

    simulateValidSubmit();

    await waitFor(() => {
      Helper.testElementText('main-error', error.message);
    });

    Helper.testChildCount('error-wrap', 1);
  });

  it('Should call SaveAccessToken on sucess', async () => {
    const {addAccountSpy, setCurrentAccountMock} = makeSut();

    simulateValidSubmit();

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(
        addAccountSpy.account
      );
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  it('Should go to signup page', async () => {
    makeSut();
    const loginButton = screen.getByTestId('login-link');
    fireEvent.click(loginButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });
});

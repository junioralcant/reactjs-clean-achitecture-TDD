import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {AccountModel} from '../../../domain/models';
import {
  mockAccountModel,
  mockSurveyListModel,
} from '../../../domain/test';
import {ILoadSurveyList} from '../../../domain/useCases';
import {ApiContext} from '../../contexs/api/api-context';
import {SurveyList} from './survey-list';

class LoadSurveyListSpy implements ILoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<ILoadSurveyList.Model[] | undefined> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

function makeSut(
  loadSurveyListSpy = new LoadSurveyListSpy()
): SutTypes {
  const setCurrentAccountMock = jest.fn();

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: mockAccountModel,
      }}
    >
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </ApiContext.Provider>
  );
  return {
    loadSurveyListSpy,
    setCurrentAccountMock,
  };
}

describe('SurveyzList Component', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
    await waitFor(() => surveyList);
  });

  it('Should call LoadSurveyList', async () => {
    const {loadSurveyListSpy} = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByText('Enquetes'));
  });

  it('Should render SurveyItems on sucess', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() =>
      expect(
        surveyList.querySelectorAll('li.surveyItemWrap').length
      ).toBe(3)
    );
  });

  it('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);

    await waitFor(() =>
      expect(
        screen.queryByTestId('survey-list')
      ).not.toBeInTheDocument()
    );
    expect(screen.getByTestId('error')).toHaveTextContent(
      error.message
    );
  });

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new AccessDeniedError();
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(error);

    const {setCurrentAccountMock} = makeSut(loadSurveyListSpy);

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    });
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  it('Should call LoadSurveyList on realod ', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError());

    makeSut(loadSurveyListSpy);
    await waitFor(() =>
      fireEvent.click(screen.getByTestId('reload'))
    );
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});

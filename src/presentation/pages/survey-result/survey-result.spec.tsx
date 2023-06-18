import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {SurveyResult} from './survey-result';
import {
  LoadSurveyResultSpy,
  SaveSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from '../../../domain/test';
import {
  AccessDeniedError,
  UnexpectedError,
} from '../../../domain/errors';
import {ApiContext} from '../../contexs/api/api-context';
import {AccountModel} from '../../../domain/models';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
};

function makeSut({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
}: SutParams = {}): SutTypes {
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult
        loadSurveyResult={loadSurveyResultSpy}
        saveSurveyResult={saveSurveyResultSpy}
      />
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    setCurrentAccountMock,
  };
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SurveyResult Component', () => {
  it('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  it('Should call LoadSurveyResult', async () => {
    const {loadSurveyResultSpy} = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  it('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();

    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-12-30T00:00:00'),
    });

    loadSurveyResultSpy.surveyResult = surveyResult;

    makeSut({loadSurveyResultSpy});

    await waitFor(() => screen.getByTestId('day'));
    expect(screen.getByTestId('day')).toHaveTextContent('30');
    expect(screen.getByTestId('month')).toHaveTextContent('dez');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question
    );
    expect(screen.getByTestId('answers').childElementCount).toBe(2);

    const answersWrap = screen.queryAllByTestId('answer-wrap');
    expect(answersWrap[0]).toHaveClass('active');
    expect(answersWrap[1]).not.toHaveClass('active');

    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute(
      'src',
      surveyResult.answers[0].image
    );
    expect(images[0]).toHaveAttribute(
      'alt',
      surveyResult.answers[0].answer
    );
    expect(images[1]).toBeFalsy();

    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(
      surveyResult.answers[0].answer
    );
    expect(answers[1]).toHaveTextContent(
      surveyResult.answers[1].answer
    );

    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`
    );
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`
    );
  });

  it('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(error);
    makeSut({loadSurveyResultSpy});

    await waitFor(() => screen.getByTestId('error'));

    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(
      error.message
    );
  });

  it('Should render error on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new AccessDeniedError();

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(error);

    const {setCurrentAccountMock} = makeSut({loadSurveyResultSpy});

    await waitFor(() => screen.getByTestId('survey-result'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  });

  it('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(error);

    makeSut({loadSurveyResultSpy});

    await waitFor(() => screen.getByTestId('error'));

    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByTestId('survey-result'));
  });

  it('Should not present Loading on active answer click', async () => {
    makeSut();

    await waitFor(() => screen.getByTestId('answers'));

    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[0]);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('Should call SaveSurveyResult on non active answer click', async () => {
    const {saveSurveyResultSpy, loadSurveyResultSpy} = makeSut();

    await waitFor(() => screen.getByTestId('answers'));

    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[1]);
    expect(screen.queryByTestId('loading')).toBeInTheDocument();
    expect(saveSurveyResultSpy.params).toEqual({
      answers: loadSurveyResultSpy.surveyResult.answers[1].answer,
    });
  });

  it('Should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const error = new UnexpectedError();

    jest
      .spyOn(saveSurveyResultSpy, 'save')
      .mockRejectedValueOnce(error);
    makeSut({saveSurveyResultSpy});

    await waitFor(() => screen.getByTestId('answers'));

    const answersWrap = screen.queryAllByTestId('answer-wrap');

    fireEvent.click(answersWrap[1]);

    await waitFor(() => screen.getByTestId('error'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(
      error.message
    );
  });
});

import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  IAddAccount,
  ISaveAccessToken,
} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {FormStatus} from '../../components/form-status/form-status';
import {Input} from '../../components/input/input';
import {LoginHeader} from '../../components/login-header/login-header';
import {SubmitButton} from '../../components/submit-button/submit-button';
import {CreateContextForm} from '../../contexs/form/form-context';
import {IValidation} from '../../protocols/validation';
import './signup-styles.scss';

type Props = {
  validation: IValidation;
  addAccount: IAddAccount;
  saveAccessToken: ISaveAccessToken;
};

export function SignUp({
  validation,
  addAccount,
  saveAccessToken,
}: Props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    const nameError = validation.validate('name', state.name);
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate(
      'password',
      state.password
    );
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      state.passwordConfirmation
    );

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    });
  }, [
    state.name,
    state.email,
    state.password,
    state.passwordConfirmation,
  ]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }

      setState({
        ...state,
        isLoading: true,
      });

      const response = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });

      await saveAccessToken.save(response.accessToken);
      navigate('/');
    } catch (error: any) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  }

  return (
    <div className="signup">
      <LoginHeader />

      <CreateContextForm.Provider value={{state, setState}}>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Criar conta</h2>

          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />

          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
          />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <SubmitButton text="Cadastrar" />

          <span
            data-testid="login-link"
            onClick={() => navigate('/login')}
            className="link"
          >
            Voltar para Login
          </span>
          <FormStatus />
        </form>
      </CreateContextForm.Provider>

      <Footer />
    </div>
  );
}

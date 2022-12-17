import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  IAddAccount,
  IUpdateCurrentAccount,
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
  updateCurrentAccount: IUpdateCurrentAccount;
};

export function SignUp({
  validation,
  addAccount,
  updateCurrentAccount,
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
    const {name, email, password, passwordConfirmation} = state;
    const formData = {name, email, password, passwordConfirmation};

    const nameError = validation.validate('name', formData);
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
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

      await updateCurrentAccount.save(response);
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

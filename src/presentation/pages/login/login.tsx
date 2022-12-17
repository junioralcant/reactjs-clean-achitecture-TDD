import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  IAuthentication,
  IUpdateCurrentAccount,
} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {FormStatus} from '../../components/form-status/form-status';
import {Input} from '../../components/input/input';
import {LoginHeader} from '../../components/login-header/login-header';
import {SubmitButton} from '../../components/submit-button/submit-button';
import {CreateContextForm} from '../../contexs/form/form-context';
import {IValidation} from '../../protocols/validation';
import './login-styles.scss';

type Props = {
  validation: IValidation;
  authentication: IAuthentication;
  updateCurrentAccount: IUpdateCurrentAccount;
};

export function Login({
  validation,
  authentication,
  updateCurrentAccount,
}: Props) {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const {email, password} = state;
    const formData = {email, password};
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    });
  }, [state.email, state.password]);

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

      const response = await authentication.auth({
        email: state.email,
        password: state.password,
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
    <div className="login">
      <LoginHeader />

      <CreateContextForm.Provider value={{state, setState}}>
        <form
          data-testid="form"
          className="form"
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>

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

          <SubmitButton text="Entrar" />

          <span
            onClick={() => navigate('/signup')}
            data-testid="signup-link"
            className="link"
          >
            Criar conta
          </span>
          <FormStatus />
        </form>
      </CreateContextForm.Provider>

      <Footer />
    </div>
  );
}

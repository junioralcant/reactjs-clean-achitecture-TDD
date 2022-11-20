import React, { useEffect, useState } from 'react';
import { IAuthentication } from '../../../domain/useCases';
import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import { CreateContextForm } from '../../contexs/form/form-context';
import { IValidation } from '../../protocols/validation';
import './login-styles.scss';

type Props = {
  validation: IValidation;
  authentication: IAuthentication;
};

export function Login({ validation, authentication }: Props) {
  const [state, setState] = useState({
    isLoding: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      if (state.isLoding || state.emailError || state.passwordError) {
        return;
      }

      setState({
        ...state,
        isLoding: true,
      });

      await authentication.auth({
        email: state.email,
        password: state.password,
      });
    } catch (error: any) {
      setState({
        ...state,
        isLoding: false,
        mainError: error.message,
      });
    }
  }

  return (
    <div className="login">
      <LoginHeader />

      <CreateContextForm.Provider value={{ state, setState }}>
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

          <button
            data-testid="submit"
            className="submit"
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
          >
            Entrar
          </button>
          <span className="link">Criar conta</span>
          <FormStatus />
        </form>
      </CreateContextForm.Provider>

      <Footer />
    </div>
  );
}

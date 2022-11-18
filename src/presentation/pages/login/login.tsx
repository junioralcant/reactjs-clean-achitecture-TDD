import { useEffect, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import { CreateContextForm } from '../../contexs/form/form-context';
import { IValidation } from '../../protocols/validation';
import './login-styles.scss';

type Props = {
  validation: IValidation;
};

export function Login({ validation }: Props) {
  const [state, setState] = useState({
    isLoding: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <div className="login">
      <LoginHeader />

      <CreateContextForm.Provider value={{ state, setState }}>
        <form className="form">
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
            disabled
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

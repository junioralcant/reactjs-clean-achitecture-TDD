import { useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import { CreateContextForm } from '../../contexs/form/form-context';
import './login-styles.scss';

export function Login() {
  const [state] = useState({
    isLoding: false,
  });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: '',
  });

  return (
    <div className="login">
      <LoginHeader />

      <CreateContextForm.Provider value={{ state, errorState }}>
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

import {useState} from 'react';
import {Footer} from '../../components/footer/footer';
import {FormStatus} from '../../components/form-status/form-status';
import {Input} from '../../components/input/input';
import {LoginHeader} from '../../components/login-header/login-header';
import {CreateContextForm} from '../../contexs/form/form-context';
import './signup-styles.scss';

export function SignUp() {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  return (
    <div className="signup">
      <LoginHeader />

      <CreateContextForm.Provider value={{state}}>
        <form className="form">
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

          <button
            data-testid="submit"
            disabled
            className="submit"
            type="submit"
          >
            Entrar
          </button>
          <span className="link">Voltar para Login</span>
          <FormStatus />
        </form>
      </CreateContextForm.Provider>

      <Footer />
    </div>
  );
}

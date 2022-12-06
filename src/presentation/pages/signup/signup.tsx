import {useEffect, useState} from 'react';
import {Footer} from '../../components/footer/footer';
import {FormStatus} from '../../components/form-status/form-status';
import {Input} from '../../components/input/input';
import {LoginHeader} from '../../components/login-header/login-header';
import {CreateContextForm} from '../../contexs/form/form-context';
import {IValidation} from '../../protocols/validation';
import './signup-styles.scss';

type Props = {
  validation: IValidation;
};

export function SignUp({validation}: Props) {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
    });
  }, [state.name]);

  return (
    <div className="signup">
      <LoginHeader />

      <CreateContextForm.Provider value={{state, setState}}>
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

import {useEffect, useState} from 'react';
import {IAddAccount} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {FormStatus} from '../../components/form-status/form-status';
import {Input} from '../../components/input/input';
import {LoginHeader} from '../../components/login-header/login-header';
import {CreateContextForm} from '../../contexs/form/form-context';
import {IValidation} from '../../protocols/validation';
import './signup-styles.scss';

type Props = {
  validation: IValidation;
  addAccount: IAddAccount;
};

export function SignUp({validation, addAccount}: Props) {
  const [state, setState] = useState({
    isLoading: false,
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
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
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

    if (
      state.isLoading ||
      state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError
    ) {
      return;
    }

    setState({
      ...state,
      isLoading: true,
    });

    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    });
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

          <button
            data-testid="submit"
            className="submit"
            type="submit"
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
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

import { Footer } from '../../components/footer/footer';
import { FormStatus } from '../../components/form-status/form-status';
import { Input } from '../../components/input/input';
import { LoginHeader } from '../../components/login-header/login-header';
import { Spinner } from '../../components/spinner/spinner';
import './login-styles.scss';

export function Login() {
  return (
    <div className="login">
      <LoginHeader />
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

        <button className="submit" type="submit">
          Entrar
        </button>
        <span className="link">Criar conta</span>
        <FormStatus />
      </form>

      <Footer />
    </div>
  );
}

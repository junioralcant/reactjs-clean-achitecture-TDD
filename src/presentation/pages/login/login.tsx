import { Footer } from '../../components/footer/footer';
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
        <div className="errorWrap">
          <Spinner className="spinner" />
          <span className="error">Error</span>
        </div>
      </form>

      <Footer />
    </div>
  );
}

import { Logo } from '../../components/logo/logo';
import { Spinner } from '../../components/spinner/spinner';
import './login-styles.scss';

export function Login() {
  return (
    <div className="login">
      <header className="header">
        <Logo />
        <h1>4dev - Enquetes para programadores</h1>
      </header>
      <form className="form">
        <h2>Login</h2>
        <div className="inputWrap">
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
          />
          <span className="status">🔴</span>
        </div>

        <div className="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <span className="status">🔴</span>
        </div>

        <button className="submit" type="submit">
          Entrar
        </button>
        <span className="link">Criar conta</span>
        <div className="errorWrap">
          <Spinner className="spinner" />
          <span className="error">Error</span>
        </div>
      </form>
      <footer className="footer"></footer>
    </div>
  );
}

import {Logo} from '../logo/logo';
import './header-styles.scss';

export function Header() {
  return (
    <header className="headerWrap">
      <div className="headerContent">
        <Logo />
        <div className="logoutWrap">
          <span>Rodrigo</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
}

import React, {useContext} from 'react';
import {ApiContext} from '../../contexs/api/api-context';
import {useLogout} from '../../hooks/use-logout';
import {Logo} from '../logo/logo';
import './header-styles.scss';

export function Header() {
  const {getCurrentAccount} = useContext(ApiContext);
  const logoutHook = useLogout();

  const account = getCurrentAccount();

  function handleLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();
    logoutHook();
  }
  return (
    <header className="headerWrap">
      <div className="headerContent">
        <Logo />
        <div className="logoutWrap">
          <span data-testid="username">{account.name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
}

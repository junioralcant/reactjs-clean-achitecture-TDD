import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ApiContext} from '../../contexs/api/api-context';
import {Logo} from '../logo/logo';
import './header-styles.scss';

export function Header() {
  const {setCurrentAccount, getCurrentAccount} =
    useContext(ApiContext);

  const navigate = useNavigate();

  const account = getCurrentAccount();

  function logout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();
    setCurrentAccount(undefined);
    navigate('/login');
  }
  return (
    <header className="headerWrap">
      <div className="headerContent">
        <Logo />
        <div className="logoutWrap">
          <span data-testid="username">{account.name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
}

import React, {
  AnchorHTMLAttributes,
  DOMAttributes,
  useContext,
} from 'react';
import {useNavigate} from 'react-router-dom';
import {ApiContext} from '../../contexs/api/api-context';
import {Logo} from '../logo/logo';
import './header-styles.scss';

export function Header() {
  const {setCurrentAccount} = useContext(ApiContext);
  const navigate = useNavigate();

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
          <span>Rodrigo</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
}

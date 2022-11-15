import { memo } from 'react';
import { Logo } from '../logo/logo';
import './login-header-styles.scss';

function Header() {
  return (
    <header className="header">
      <Logo />
      <h1>4dev - Enquetes para programadores</h1>
    </header>
  );
}

export const LoginHeader = memo(Header);

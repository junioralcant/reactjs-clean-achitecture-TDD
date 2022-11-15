import { memo } from 'react';
import './footer-styles.scss';

function FooterApplication() {
  return <footer className="footer"></footer>;
}

export const Footer = memo(FooterApplication);

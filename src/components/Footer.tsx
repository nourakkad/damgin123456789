import React from 'react';
import { useLocation } from 'react-router-dom';
import { getLangFromPath, t } from '../utils/i18n';

const Footer: React.FC = () => {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2025 Damascus Gin. All rights reserved. Please drink responsibly.</p>
        <p className="powered-by">
          {t(lang as any, 'footer.powered')} <a href="https://elyptek.com" target="_blank" rel="noopener noreferrer">{t(lang as any, 'footer.brand')}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;



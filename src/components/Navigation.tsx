import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { t, getLangFromPath } from '../utils/i18n';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState<string>(() => localStorage.getItem('lang') || 'en');
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // extract lang from URL if present
  useEffect(() => {
    const current = getLangFromPath(location.pathname, 'en');
    setLang(current);
    localStorage.setItem('lang', current);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopLangRef.current?.contains(target);
      const insideMobile = mobileLangRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    // consider both prefixed and non-prefixed
    const clean = location.pathname.replace(/^\/(en|it|ar|es)/, '');
    return clean === path;
  };

  const currentFlag = (code: string) => {
    switch (code) {
      case 'en': return '/images/flags/gb.svg';
      case 'it': return '/images/flags/it.svg';
      case 'ar': return '/images/flags/sa.svg';
      case 'es': return '/images/flags/es.svg';
      default: return '/images/flags/gb.svg';
    }
  };

  const selectLang = (code: string) => {
    setLang(code);
    localStorage.setItem('lang', code);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    // navigate to same path with lang prefix
    const segments = location.pathname.split('/').filter(Boolean);
    const hasLang = segments[0] && ['en','it','ar','es'].includes(segments[0]);
    const rest = hasLang ? segments.slice(1) : segments;
    const newPath = '/' + [code, ...rest].join('/');
    navigate(newPath || '/' + code);
  };

  const pathWithLang = (path: string) => {
    const segments = location.pathname.split('/').filter(Boolean);
    const hasLang = segments[0] && ['en','it','ar','es'].includes(segments[0]);
    if (hasLang) {
      const clean = path.replace(/^\//, '');
      return `/${lang}/${clean}`;
    }
    return path;
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <Link 
              to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/` : '/'} 
              className="nav-logo" 
              onClick={closeMobileMenu}
            >
              <img 
                src="/images/damascus-gin-logo-gold.png" 
                alt="Damascus Gin Logo" 
                className="nav-logo-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </Link>
            <div className="nav-left-footer">
              <div className="nav-social">
                <a href="https://www.instagram.com/damascus_gin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61562533851090" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.tiktok.com/@damascusgin" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                <a href="mailto:info@damascusgin.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
              </div>
              <div className="nav-lang" ref={desktopLangRef}>
                <button className="nav-lang-btn" onClick={() => setIsLangOpen((v) => !v)} aria-expanded={isLangOpen} aria-haspopup="menu">
                  <img className="flag-img" src={currentFlag(lang)} alt="current language" width={24} height={16} />
                  <span className="nav-lang-caret">▾</span>
                </button>
                <div className={`nav-lang-menu ${isLangOpen ? 'open' : ''}`} role="menu">
                  <button className={`lang-item${lang==='en' ? ' active' : ''}`} onClick={() => selectLang('en')} role="menuitem" aria-label="English"><img className="flag-img" src="/images/flags/gb.svg" alt="English" width={24} height={16} /></button>
                  <button className={`lang-item${lang==='ar' ? ' active' : ''}`} onClick={() => selectLang('ar')} role="menuitem" aria-label="Arabic"><img className="flag-img" src="/images/flags/sa.svg" alt="Arabic" width={24} height={16} /></button>
                  <button className={`lang-item${lang==='es' ? ' active' : ''}`} onClick={() => selectLang('es')} role="menuitem" aria-label="Español"><img className="flag-img" src="/images/flags/es.svg" alt="Español" width={24} height={16} /></button>
                  <button className={`lang-item${lang==='it' ? ' active' : ''}`} onClick={() => selectLang('it')} role="menuitem" aria-label="Italiano"><img className="flag-img" src="/images/flags/it.svg" alt="Italiano" width={24} height={16} /></button>
                </div>
              </div>
            </div>
          </div>

          <ul className="nav-menu nav-center">
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/` : '/'} 
                className={isActive('/') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.home')}
              </Link>
            </li>
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/our-story` : '/our-story'} 
                className={isActive('/our-story') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.ourStory')}
              </Link>
            </li>
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/gallery` : '/gallery'} 
                className={isActive('/gallery') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.gallery')}
              </Link>
            </li>
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/blog` : '/blog'} 
                className={isActive('/blog') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.blog')}
              </Link>
            </li>
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/awards` : '/awards'} 
                className={isActive('/awards') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.awards')}
              </Link>
            </li>
            <li>
              <Link 
                to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/where-to-buy` : '/where-to-buy'} 
                className={isActive('/where-to-buy') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {t(lang as any, 'nav.whereToBuy')}
              </Link>
            </li>
          </ul>

          <div className="nav-right">
            <div className="nav-lang nav-lang-mobile" ref={mobileLangRef}>
              <button className="nav-lang-btn" onClick={() => setIsLangOpen((v) => !v)} aria-expanded={isLangOpen} aria-haspopup="menu">
                <img className="flag-img" src={currentFlag(lang)} alt="current language" width={24} height={16} />
                <span className="nav-lang-caret">▾</span>
              </button>
              <div className={`nav-lang-menu ${isLangOpen ? 'open' : ''}`} role="menu">
                <button className={`lang-item${lang==='en' ? ' active' : ''}`} onClick={() => selectLang('en')} role="menuitem" aria-label="English"><img className="flag-img" src="/images/flags/gb.svg" alt="English" width={24} height={16} /></button>
                <button className={`lang-item${lang==='ar' ? ' active' : ''}`} onClick={() => selectLang('ar')} role="menuitem" aria-label="Arabic"><img className="flag-img" src="/images/flags/sa.svg" alt="Arabic" width={24} height={16} /></button>
                <button className={`lang-item${lang==='es' ? ' active' : ''}`} onClick={() => selectLang('es')} role="menuitem" aria-label="Español"><img className="flag-img" src="/images/flags/es.svg" alt="Español" width={24} height={16} /></button>
                <button className={`lang-item${lang==='it' ? ' active' : ''}`} onClick={() => selectLang('it')} role="menuitem" aria-label="Italiano"><img className="flag-img" src="/images/flags/it.svg" alt="Italiano" width={24} height={16} /></button>
              </div>
            </div>
            <Link to={['en','it','ar','es'].includes(location.pathname.split('/').filter(Boolean)[0]) ? `/${lang}/cocktails` : '/cocktails'} className="nav-cta" onClick={closeMobileMenu}>{t(lang as any, 'nav.cta')}</Link>
            <button 
              className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', textAlign: 'center' }}>
          <li>
            <Link 
              to={pathWithLang('/')} 
              className={isActive('/') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.home')}
            </Link>
          </li>
          <li>
            <Link 
              to={pathWithLang('/our-story')} 
              className={isActive('/our-story') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.ourStory')}
            </Link>
          </li>
          <li>
            <Link 
              to={pathWithLang('/gallery')} 
              className={isActive('/gallery') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.gallery')}
            </Link>
          </li>
          <li>
            <Link 
              to={pathWithLang('/blog')} 
              className={isActive('/blog') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.blog')}
            </Link>
          </li>
          <li>
            <Link 
              to={pathWithLang('/awards')} 
              className={isActive('/awards') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.awards')}
            </Link>
          </li>
          <li>
            <Link 
              to={pathWithLang('/where-to-buy')} 
              className={isActive('/where-to-buy') ? 'active' : ''}
              onClick={closeMobileMenu}
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '12px 0', fontSize: '1.25rem', fontWeight: 700 }}
            >
              {t(lang as any, 'nav.whereToBuy')}
            </Link>
          </li>
          <li>
            <Link to={pathWithLang('/cocktails')} onClick={closeMobileMenu} className="nav-cta mobile">{t(lang as any, 'nav.cta')}</Link>
          </li>
          <li>
            <div className="mobile-social">
              <a href="https://www.instagram.com/damascus_gin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61562533851090" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.tiktok.com/@damascusgin" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="mailto:info@damascusgin.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation; 
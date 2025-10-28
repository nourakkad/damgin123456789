import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import enDict from '../locales/en.json';
import esDict from '../locales/es.json';
import itDict from '../locales/it.json';
import arDict from '../locales/ar.json';
import './Cocktails.css';
import { t, getLangFromPath, Lang } from '../utils/i18n';

type AnimationVariant = 'up' | 'left' | 'right' | 'zoom';

const Animated: React.FC<{ children: React.ReactNode; variant?: AnimationVariant; delayMs?: number; durationMs?: number }> = ({
  children,
  variant = 'up',
  delayMs = 0,
  durationMs = 600,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const initialTransform = (() => {
    switch (variant) {
      case 'left':
        return 'translateX(-24px)';
      case 'right':
        return 'translateX(24px)';
      case 'zoom':
        return 'scale(0.98)';
      default:
        return 'translateY(24px)';
    }
  })();

  const style: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : initialTransform,
    transition: `opacity ${durationMs}ms ease ${delayMs}ms, transform ${durationMs}ms ease ${delayMs}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

const Cocktails: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const dictionaries: Record<Lang, any> = { en: enDict, es: esDict, it: itDict, ar: arDict };
  const currentDict = dictionaries[lang] || dictionaries.en;
  const location = useLocation();

  useEffect(() => {
    const current = getLangFromPath(location.pathname, 'en');
    setLang(current);
    localStorage.setItem('lang', current);
  }, [location.pathname]);

  return (
    <div className="cocktails" style={{ overflowX: 'hidden' }}>
      {/* Hero Section - Matching Our Story Design */}
      <section className="cocktails-hero">
        <div className="container-grid">
          <div className="corners">
            <div className="text-content">
              <h2 className="title">{t(lang, 'cocktails.heroTitle')}</h2>
              <h3 className="subtitle">{t(lang, 'cocktails.heroSubtitle')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section from 'A Journey in Every Sip' body */}
      <section className="recipe-section">
        <div className="recipe-content">
          <Animated variant="left">
          <div className="recipe-left">
            <div className="recipe-header">
            <h2 className="recipe-title" dangerouslySetInnerHTML={{ __html: t(lang, 'cocktails.page.intro.title') }}/>
            </div>
            <div className="journey-description">
              <p>{t(lang, 'cocktails.page.intro.p1')}</p>
              <p>{t(lang, 'cocktails.page.intro.p2')}</p>
              <p>{t(lang, 'cocktails.page.intro.p3')}</p>
              <p>{t(lang, 'cocktails.page.intro.p4')}</p>
            </div>
          </div>
          </Animated>
          <Animated variant="right" delayMs={120}>
          <div className="recipe-right">
            <div className="cocktail-image">
              <img 
                src="/images/cocktails/intro.png" 
                alt="Damascus Gin feature"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/cocktails/intro.png';
                }}
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h3>{t(lang, 'cocktails.page.intro.overlayTitle')}</h3>
                  <p>{t(lang, 'cocktails.page.intro.overlaySubtitle')}</p>
                </div>
              </div>
            </div>
          </div>
          </Animated>
        </div>
      </section>

      <div className="container">
        <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />
        {/* Damascus Dream */}
        <section className="recipe-section">
          <div className="recipe-content">
            <Animated>
            <div className="recipe-left">
              <div className="recipe-header">
                <h2 className="recipe-title">{t(lang, 'cocktails.page.dream.title')}</h2>
                <span className="recipe-category">{t(lang, 'cocktails.page.dream.category')}</span>
              </div>
              
              <div className="recipe-ingredients">
                <h3>{t(lang, 'cocktails.page.common.ingredients')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(currentDict.cocktails.page.dream.ingredients as string[]).map((item: string, idx: number) => (
                    <li key={idx}><span style={{ marginRight: 8 }}></span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-instructions">
                <h3>{t(lang, 'cocktails.page.common.instructions')}</h3>
                <ol>
                  {(currentDict.cocktails.page.dream.instructions as string[]).map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />

              <div className="recipe-tips">
                <h3>{t(lang, 'cocktails.page.common.tips')}</h3>
                <p>{t(lang, 'cocktails.page.dream.tips')}</p>
              </div>
            </div>
            </Animated>

            <Animated variant="right" delayMs={120}>
            <div className="recipe-right">
              <div className="cocktail-image">
                <img 
                  src="/images/cocktails/dream.jpg" 
                  alt="Damascus Dream Cocktail"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/cocktails/dream.jpg';
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Damascus Dream</h3>
                    <p>A journey through spice markets and citrus groves</p>
                  </div>
                </div>
              </div>
            </div>
            </Animated>
          </div>
        </section>

        <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />
        {/* Damascus Gin Mojito */}
        <section className="recipe-section">
          <div className="recipe-content">
            <Animated>
            <div className="recipe-left">
              <div className="recipe-header">
                <h2 className="recipe-title">{t(lang, 'cocktails.page.mojito.title')}</h2>
                <span className="recipe-category">{t(lang, 'cocktails.page.mojito.category')}</span>
              </div>
              
              <div className="recipe-ingredients">
                <h3>{t(lang, 'cocktails.page.common.ingredients')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(currentDict.cocktails.page.mojito.ingredients as string[]).map((item: string, idx: number) => (
                    <li key={idx}><span style={{ marginRight: 8 }}></span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-instructions">
                <h3>{t(lang, 'cocktails.page.common.instructions')}</h3>
                <ol>
                  {(currentDict.cocktails.page.mojito.instructions as string[]).map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />

              <div className="recipe-tips">
                <h3>{t(lang, 'cocktails.page.common.tips')}</h3>
                <p>{t(lang, 'cocktails.page.mojito.tips')}</p>
              </div>
            </div>
            </Animated>

            <Animated variant="right" delayMs={120}>
            <div className="recipe-right">
              <div className="cocktail-image">
                <img 
                  src="/images/cocktails/mojito.jpg" 
                  alt="Damascus Gin Mojito"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/cocktails/mojito.jpg';
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Damascus Gin Mojito</h3>
                    <p>Middle Eastern elegance meets classic refreshment</p>
                  </div>
                </div>
              </div>
            </div>
            </Animated>
          </div>
        </section>

        <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />
        {/* The Sultan's Spritz */}
        <section className="recipe-section">
          <div className="recipe-content">
            <Animated>
            <div className="recipe-left">
              <div className="recipe-header">
                <h2 className="recipe-title">{t(lang, 'cocktails.page.sultan.title')}</h2>
                <span className="recipe-category">{t(lang, 'cocktails.page.sultan.category')}</span>
              </div>
              
              <div className="recipe-ingredients">
                <h3>{t(lang, 'cocktails.page.common.ingredients')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(currentDict.cocktails.page.sultan.ingredients as string[]).map((item: string, idx: number) => (
                    <li key={idx}><span style={{ marginRight: 8 }}></span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-instructions">
                <h3>{t(lang, 'cocktails.page.common.instructions')}</h3>
                <ol>
                  {(currentDict.cocktails.page.sultan.instructions as string[]).map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />

              <div className="recipe-tips">
                <h3>{t(lang, 'cocktails.page.common.tips')}</h3>
                <p>{t(lang, 'cocktails.page.sultan.tips')}</p>
              </div>
            </div>
            </Animated>

            <Animated variant="right" delayMs={120}>
            <div className="recipe-right">
              <div className="cocktail-image">
                <img 
                  src="/images/cocktails/sultan.jpg" 
                  alt="The Sultan's Spritz"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/cocktails/sultan.jpg';
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>The Sultan's Spritz</h3>
                    <p>Luxury and celebration in every sip</p>
                  </div>
                </div>
              </div>
            </div>
            </Animated>
          </div>
        </section>

        <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />
        {/* Oasis Breeze */}
        <section className="recipe-section">
          <div className="recipe-content">
            <Animated>
            <div className="recipe-left">
              <div className="recipe-header">
                <h2 className="recipe-title">{t(lang, 'cocktails.page.oasis.title')}</h2>
                <span className="recipe-category">{t(lang, 'cocktails.page.oasis.category')}</span>
              </div>
              
              <div className="recipe-ingredients">
                <h3>{t(lang, 'cocktails.page.common.ingredients')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(currentDict.cocktails.page.oasis.ingredients as string[]).map((item: string, idx: number) => (
                    <li key={idx}><span style={{ marginRight: 8 }}></span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-instructions">
                <h3>{t(lang, 'cocktails.page.common.instructions')}</h3>
                <ol>
                  {(currentDict.cocktails.page.oasis.instructions as string[]).map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <hr style={{ border: '0', height: 3, backgroundColor: '#ccc', opacity: 0.5, margin: '24px 0' }} />

              <div className="recipe-tips">
                <h3>{t(lang, 'cocktails.page.common.tips')}</h3>
                <p>{t(lang, 'cocktails.page.oasis.tips')}</p>
              </div>
            </div>
            </Animated>

            <Animated variant="right" delayMs={120}>
            <div className="recipe-right">
              <div className="cocktail-image">
                <img 
                  src="/images/cocktails/oasis.jpg" 
                  alt="Oasis Breeze"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/cocktails/oasis.jpg';
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Oasis Breeze</h3>
                    <p>Calm and elegance in every sip</p>
                  </div>
                </div>
              </div>
            </div>
            </Animated>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cocktails;

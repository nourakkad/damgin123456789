import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './OurStory.css';
import { t, getLangFromPath } from '../utils/i18n';

const OurStory: React.FC = () => {
  const [lang, setLang] = useState<string>('en');
  const [isSectionThreeVisible, setIsSectionThreeVisible] = useState<boolean>(false);
  const sectionThreeRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const current = getLangFromPath(location.pathname, 'en');
    setLang(current);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionThreeVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const element = sectionThreeRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div className="our-story" style={{ overflowX: 'hidden' }}>
      {/* Section One - as per provided design */}
      <section className="section-one">
        <div className="container-grid">
          <div className="corners">
            <div className="text-content">
              <h2 className="title">{t(lang as any, 'ourStory.section1.title')}</h2>
              <h3 className="subtitle">{t(lang as any, 'ourStory.section1.subtitle')}</h3>
              <p className="para">
                {t(lang as any, 'ourStory.section1.paragraph')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Two - placeholder collage */}
      <section className="section-two">
        <div className="gallery-grid">
          <div className="top-row">
            <div className="main-placeholder">
              <img src="/images/ourstory/1.webp" alt="Our Story Main" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="side-stack">
              <div className="small-placeholder">
                <img src="/images/ourstory/2.webp" alt="Our Story Side 1" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
              </div>
              <div className="small-placeholder">
                <img src="/images/ourstory/3.webp" alt="Our Story Side 2" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
              </div>
            </div>
          </div>
          <div className="thumb-row">
            <div className="thumb-placeholder">
              <img src="/images/ourstory/4.webp" alt="Our Story Thumb 1" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="thumb-placeholder">
              <img src="/images/ourstory/5.webp" alt="Our Story Thumb 2" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="thumb-placeholder">
              <img src="/images/ourstory/6.webp" alt="Our Story Thumb 3" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
            <div className="thumb-placeholder">
              <img src="/images/ourstory/7.webp" alt="Our Story Thumb 4" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Section Three - alternating text/image */}
      <section ref={sectionThreeRef} className={`section-three ${isSectionThreeVisible ? 'animate' : ''}`}>
        <div className="shape-top"></div>
        <div className="shape-mid"></div>
        <div className="grid">
          <div className="t1">
            <p className="emphasis">
              {t(lang as any, 'ourStory.section3.emphasis')}
            </p>
          </div>
          <div className="i1">
            <div className="img-ph">
              <img src="/images/ourstory/2.1.webp" alt="Our Story Section 3" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
          </div>
          <div className="i2">
            <div className="img-ph">
              <img src="/images/ourstory/2.2.webp" alt="Our Story Section 3" loading="lazy" decoding="async" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            </div>
          </div>
          <div className="t2">
            <p className="detail">
              {t(lang as any, 'ourStory.section3.detail')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory; 
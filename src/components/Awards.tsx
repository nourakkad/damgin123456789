import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Awards.css';
import { getLangFromPath, t, Lang } from '../utils/i18n';
import enDict from '../locales/en.json';
import esDict from '../locales/es.json';
import itDict from '../locales/it.json';
import arDict from '../locales/ar.json';

const Awards: React.FC = () => {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');
  const dictionaries: Record<Lang, any> = { en: enDict, es: esDict, it: itDict, ar: arDict };
  const currentDict = dictionaries[lang] || dictionaries.en;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="awards-page">
      <div className="awards-container">
        <div className="awards-icon" aria-hidden="true">
          <i className="fas fa-trophy"></i>
        </div>
        
        <h2 className="awards-headline">{t(lang as any, 'awards.section.headline')}</h2>
        <div className="awards-body">
          {(currentDict.awards?.section?.paragraphs || enDict.awards.section.paragraphs).map((p: string, idx: number) => (
            <p key={idx} className={p.includes('“') || p.includes('"') ? 'awards-quote' : ''}>{p}</p>
          ))}
        </div>
        <div className="awards-badges">
          <img src="/images/awards/badge-1.png" alt="Gin Guide Award badge 1" loading="lazy" />
          <img src="/images/awards/badge-2.png" alt="Gin Guide Award badge 2" loading="lazy" />
          <img src="/images/awards/badge-3.png" alt="Gin Guide Award badge 3" loading="lazy" />
        </div>
        <div className="awards-media">
          <div className="awards-photos">
            <img src="/images/awards/1.jpg" alt="Damascus Gin awards 1" loading="lazy" decoding="async" />
            <img src="/images/awards/2.jpg" alt="Damascus Gin awards 2" loading="lazy" decoding="async" />
          </div>
          <div className={`awards-video ${isPlaying ? 'playing' : ''}`}>
            <video
              ref={videoRef}
              controls={isPlaying}
              preload="metadata"
              poster="/images/awards/1.jpg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/images/awards/3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              type="button"
              aria-label="Play video"
              className="play-overlay"
              onClick={() => {
                const el = videoRef.current;
                if (!el) return;
                el.play();
              }}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;



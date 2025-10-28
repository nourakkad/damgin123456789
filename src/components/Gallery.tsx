import React, { useState, useCallback } from 'react';
import './Gallery.css';
import { getLangFromPath, t } from '../utils/i18n';

const Gallery: React.FC = () => {
  const lang = getLangFromPath(window.location.pathname);
  const [selectedItem, setSelectedItem] = useState<{ type: 'image' | 'video'; src: string; poster?: string } | null>(null);

  const galleryData: Array<{
    id: number;
    title: string;
    description: string;
    image?: string;
    video?: string;
    poster?: string;
    category: string;
  }> = [
    {
      id: 1,
      title: 'Damascus<br/>Gin',
      description: 'Every bottle tells a story',
      image: '/images/gallery/Untitled-110.webp',
      category: 'experience'
    },
    {
      id: 2,
      title: 'Damascus<br/>Gin',
      description: 'A spirit born from heritage',
      image: '/images/gallery/Untitled16.webp',
      category: 'experience'
    },
    {
      id: 3,
      title: 'Damascus<br/>Gin',
      description: 'Celebrate in every pour',
      image: '/images/gallery/Untitled-9.webp',
      category: 'experience'
    },
    {
      id: 4,
      title: 'Damascus<br/>Gin',
      description: 'Pure Elegance',
      image: '/images/gallery/2.webp',
      category: 'experience'
    },
    {
      id: 5,
      title: 'Damascus<br/>Gin',
      description: 'Born Free',
      image: '/images/gallery/3.webp',
      category: 'experience'
    },
    {
      id: 6,
      title: 'Damascus<br/>Gin',
      description: 'A rose in every glass',
      image: '/images/gallery/6.webp',
      category: 'experience'
    },
    {
      id: 7,
      title: 'Damascus<br/>Gin',
      description: 'The beauty of spirit',
      image: '/images/gallery/1 (1).webp',
      category: 'experience'
    },
    {
      id: 8,
      title: 'Damascus<br/>Gin',
      description: 'GinGuide Award',
      image: '/images/gallery/PHOTO 1.jpeg',
      category: 'experience'
    },
    {
      id: 9,
      title: 'Damascus<br/>Gin',
      description: 'Spirit in bloom',
      image: '/images/gallery/PHOTO 2.jpeg',
      category: 'experience'
    },
    {
      id: 10,
      title: 'Damascus<br/>Gin',
      description: 'A journey to remember',
      image: '/images/gallery/PHOTO 3.jpeg',
      category: 'experience'
    },
    {
      id: 11,
      title: 'Damascus<br/>Gin',
      description: 'Made to shine everywhere',
      image: '/images/gallery/PHOTO 4.jpeg',
      category: 'experience'
    },
    { id: 12, title: 'Damascus<br/>Gin', 
      description: '', 
      video: '/images/gallery/VIDEO 1.mp4', 
      poster: '/images/gallery/clip2-poster.jpg', 
      category: 'experience' 
    },
      { id: 13, title: 'Damascus<br/>Gin', 
      description: '', 
      video: '/images/gallery/VIDEO 2.mp4', 
      poster: '/images/gallery/clip2-poster.jpg', 
      category: 'experience' 
    },
    { id: 14, title: 'Damascus<br/>Gin', 
      description: '', 
      video: '/images/gallery/VIDEO 3.mp4', 
      poster: '/images/gallery/clip2-poster.jpg', 
      category: 'experience' 
    },
    { id: 15, title: 'Damascus<br/>Gin', 
      description: '', 
      video: '/images/gallery/VIDEO 4.mp4', 
      poster: '/images/gallery/clip2-poster.jpg', 
      category: 'experience' 
    },
    // Example video item (add more by providing video and optional poster)
    // { id: 12, title: 'Distillery Video', description: 'Short walkthrough', video: '/videos/gallery/clip1.mp4', poster: '/images/gallery/clip1-poster.jpg', category: 'process' }
  ];

  const openModal = (item: typeof galleryData[number]) => {
    if (item.video) {
      setSelectedItem({ type: 'video', src: item.video, poster: item.poster || item.image });
    } else if (item.image) {
      setSelectedItem({ type: 'image', src: item.image });
    }
  };

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Add keyboard event listener for ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  return (
    <div className="gallery" style={{ overflowX: 'hidden' }}>
      {/* Hero Section - Matching Our Story Design */}
      <section className="gallery-hero">
        <div className="container-grid">
          <div className="corners">
            <div className="text-content">
              <h2 className="title">{t(lang, 'gallery.heroTitle')}</h2>
              <h3 className="subtitle">{t(lang, 'gallery.heroSubtitle')}</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="gallery-section">
          <div className="gallery-grid">
            {galleryData.map((item) => (
              <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                {item.video ? (
                  <>
                    <video 
                      className="gallery-video-thumb"
                      
                      preload="auto"
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <div className="play-icon">▶</div>
                  </>
                ) : (
                  <img 
                    src={item.image!} 
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/damascus-gin-logo.png';
                    }}
                  />
                )}
                <div className="gallery-item-overlay">
                  <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className={`modal ${selectedItem.type === 'video' ? 'fullscreen' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedItem.type === 'video' ? (
              <video controls autoPlay playsInline style={{ width: '100%', height: '100%' }}>
                <source src={selectedItem.src} type="video/mp4" />
              </video>
            ) : (
              <img src={selectedItem.src} alt="Gallery" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 
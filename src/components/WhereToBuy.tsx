import React from 'react';
import './WhereToBuy.css';
import { getLangFromPath, t } from '../utils/i18n';

const WhereToBuy: React.FC = () => {
  const lang = getLangFromPath(window.location.pathname);
  const retailers = [
    {
      id: 1,
      name: 'Convivio S.A.R.L.',
      location: 'Lebanon',
      address: 'Sawma Jaber, Antelias, Lebanon',
      phone: '+961 81 350 092',
      type: 'Premium Spirits Shop',
      description: 'Exclusive retailer for premium spirits including Damascus Gin. Visit our store to discover our curated selection of fine spirits and craft gins.',
      rating: 4.9,
      reviews: 27,
      image: '/images/retailers/convivio.jpg',
      coordinates: { lat: 33.918341, lng: 35.58904 },
      googleMapsUrl: 'https://www.google.com/maps/place/Convivio+S.A.R.L./@33.9146568,35.5924413,15.25z/data=!4m6!3m5!1s0x151f3e6b2ce1d86f:0xd2303a3a1cea8b9f!8m2!3d33.918341!4d35.58904!16s%2Fg%2F12hnnk06g?hl=en&entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 2,
      name: 'Vinotheque',
      location: 'Lebanon',
      address: 'Beirut, Lebanon',
      phone: '+961 1 202 477',
      type: 'Wine & Spirits Shop',
      description: 'Premium wine and spirits retailer featuring Damascus Gin. Visit our store to discover our curated selection of fine wines and craft spirits.',
      rating: 4.8,
      reviews: 156,
      image: '/images/retailers/vinotheque.jpg',
      coordinates: { lat: 33.888208, lng: 35.509776 },
      googleMapsUrl: 'https://www.google.com/maps?ll=33.888208,35.509776&z=14&t=m&hl=en&gl=CH&mapclient=embed&cid=2000262010479303726'
    },
    {
      id: 3,
      name: 'Golden Star',
      location: 'Lebanon',
      address: 'Beirut, Lebanon',
      phone: '+9619641234',
      type: 'Premium Spirits Shop',
      description: 'Premium spirits retailer featuring Damascus Gin. Visit our store to discover our selection of fine spirits and craft gins.',
      rating: 4.7,
      reviews: 89,
      image: '/images/retailers/golden-star.jpg',
      coordinates: { lat: 33.888208, lng: 35.509776 },
      googleMapsUrl: 'https://www.google.com/maps?ll=33.888208,35.509776&z=14&t=m&hl=en&gl=CH&mapclient=embed&cid=2000262010479303726'
    },
    {
      id: 4,
      name: 'BEIT TOUREEF',
      location: 'Lebanon',
      address: 'Gemmayzeh, Beirut, Lebanon',
      phone: '+961 70 384 021',
      type: 'Premium Spirits Shop',
      description: 'Premium spirits retailer in the heart of Gemmayzeh featuring Damascus Gin. Visit our store to discover our selection of fine spirits and craft gins.',
      rating: 4.6,
      reviews: 67,
      image: '/images/retailers/beit-toureef.jpg',
      coordinates: { lat: 33.895188, lng: 35.519297 },
      googleMapsUrl: 'https://www.google.com/maps?ll=33.895188,35.519297&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=VGW9%2B3PF+Bayrut+Lebanon'
    },
    {
      id: 5,
      name: 'The Wooden Cellar',
      location: 'Lebanon',
      address: 'Broummana, Lebanon',
      phone: '+96124860120',
      type: 'Wine & Spirits Shop',
      description: 'Premium wine and spirits retailer in Broummana featuring Damascus Gin. Visit our store to discover our curated selection of fine wines and craft spirits.',
      rating: 4.5,
      reviews: 45,
      image: '/images/retailers/wooden-cellar.jpg',
      coordinates: { lat: 33.8875, lng: 35.6175 },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Broumana+Villa+Broumana+Lebanon&fbclid=PAZXh0bgNhZW0CMTEAAaejrKCmMN-_lLp2GcUnS9aFkW9zquKttlnnKz1g-1W-cxIDP7CtQOL2S8T5Rg_aem_OWJ81Rw007ZVZmSNQUDv6w'
    },
    {
      id: 6,
      name: 'Enab-Berlin',
      location: 'Germany',
      address: 'Online Shop',
      phone: 'Online Only',
      type: 'Online Wine & Spirits Shop',
      description: 'Premium online retailer specializing in Levantine wines, spirits, and artisan crafts. Discover Damascus Gin and other fine spirits from the region with worldwide shipping.',
      rating: 4.8,
      reviews: 234,
      image: '/images/retailers/enab-berlin.jpg',
      websiteUrl: 'https://www.enab-berlin.de/',
      isOnline: true
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const openGoogleMaps = (url: string) => {
    window.open(url, '_blank');
  };

  const callPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const openWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="where-to-buy" style={{ overflowX: 'hidden' }}>
      {/* Hero Section - Matching Our Story Design */}
      <section className="buy-hero">
        <div className="container-grid">
          <div className="corners">
            <div className="text-content">
              <h2 className="title">{t(lang, 'buy.heroTitle')}</h2>
              <h3 className="subtitle">{t(lang, 'buy.heroSubtitle')}</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="retailers-section">
          <h2>{t(lang, 'buy.retailLocations')}</h2>
          <p>{t(lang, 'buy.retailDesc')}</p>
          
          <div className="retailers-grid">
            {retailers.map((retailer) => (
              <div key={retailer.id} className={`retailer-card ${retailer.isOnline ? 'online-retailer' : ''}`}>
                <div className="retailer-content">
                  <div className="retailer-info">
                    <div className="retailer-header">
                      <h3 className="retailer-name">{retailer.name}</h3>
                      <span className={`retailer-type ${retailer.isOnline ? 'online-badge' : ''}`}>
                        {retailer.isOnline && '🌐 '}
                        {t(lang, `buy.retailers.${retailer.id}.type`) || retailer.type}
                      </span>
                    </div>
                    
                    <div className="retailer-location">
                      <div className="location-icon">
                        {retailer.isOnline ? '🌐' : '📍'}
                      </div>
                      <div className="location-details">
                        <strong>{retailer.location}</strong>
                        <p className="address">{retailer.isOnline ? t(lang, 'buy.online.address') : retailer.address}</p>
                      </div>
                    </div>

                    {!retailer.isOnline && (
                      <div className="retailer-phone">
                        <div className="phone-icon">📞</div>
                        <div className="phone-details">
                          <a 
                            href={`tel:${retailer.phone}`}
                            className="phone-link"
                            onClick={(e) => {
                              e.preventDefault();
                              callPhone(retailer.phone);
                            }}
                          >
                            {retailer.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="retailer-rating">
                      <div className="stars">
                        {renderStars(retailer.rating)}
                      </div>
                      <span className="rating-text">
                        {retailer.rating} {t(lang, 'buy.rating.outOf')}
                      </span>
                      <span className="reviews-count">
                        ({retailer.reviews} {t(lang, 'buy.rating.reviews')})
                      </span>
                    </div>
                    
                    <p className="retailer-description">{t(lang, `buy.retailers.${retailer.id}.description`) || retailer.description}</p>
                    
                    <div className="retailer-actions">
                      {retailer.isOnline ? (
                        <button 
                          className="shop-online-btn"
                          onClick={() => openWebsite(retailer.websiteUrl!)}
                        >
                          {t(lang, 'buy.buttons.shopOnline')}
                        </button>
                      ) : (
                        <>
                          <button 
                            className="view-map-btn"
                            onClick={() => openGoogleMaps(retailer.googleMapsUrl!)}
                          >
                            {t(lang, 'buy.buttons.viewOnMaps')}
                          </button>
                          <button 
                            className="call-btn"
                            onClick={() => callPhone(retailer.phone)}
                          >
                            {t(lang, 'buy.buttons.callNow')}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="retailer-image">
                    <img 
                      src={retailer.image} 
                      alt={`${retailer.name} ${retailer.isOnline ? 'website' : 'store interior'}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/retailers/store-placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhereToBuy; 
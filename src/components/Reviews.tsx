import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './Reviews.css';
import { getLangFromPath, t, tObject, Lang } from '../utils/i18n';
import { useLocation } from 'react-router-dom';

interface Review {
    name: string;
    location: string;
    text: string;
}

const Reviews: React.FC = () => {
    const location = useLocation();
    const lang = getLangFromPath(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    // Get reviews from translations with proper error handling
    const reviewsData = tObject(lang as Lang, 'home.reviews.reviews');
    const reviews: Review[] = Array.isArray(reviewsData) ? reviewsData as Review[] : [];

    // Debug logging
    console.log('Reviews data:', reviewsData);
    console.log('Reviews array:', reviews);

    const openModal = () => {
        if (reviews.length > 0) {
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
            document.body.classList.add('reviews-modal-open');
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
        document.body.classList.remove('reviews-modal-open');
    };

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const goToReview = (index: number) => {
        setCurrentReviewIndex(index);
    };

    const currentReview = reviews[currentReviewIndex] || { name: '', location: '', text: '' };

    return (
        <>
            {/* Reviews Button */}
            <button className="reviews-button" onClick={openModal}>
                {t(lang as Lang, 'home.reviews.button')}
            </button>

            {/* Modal Overlay */}
            {isOpen && createPortal(
                <div className="reviews-modal-overlay" onClick={closeModal}>
                    <div className="reviews-modal" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="reviews-modal-header">
                            <h1 className="reviews-modal-title reviews-modal-title--phone">
                                {t(lang as Lang, 'home.reviews.title')}
                            </h1>
                            <button className="reviews-modal-close" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="reviews-modal-content">
                            {/* Review Navigation */}
                            <div className="reviews-navigation">
                                <button
                                    className="reviews-nav-btn reviews-nav-prev"
                                    onClick={prevReview}
                                    aria-label="Previous review"
                                >
                                    ‹
                                </button>

                                <div className="reviews-dots">
                                    {reviews.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`reviews-dot ${index === currentReviewIndex ? 'active' : ''}`}
                                            onClick={() => goToReview(index)}
                                            aria-label={`Go to review ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    className="reviews-nav-btn reviews-nav-next"
                                    onClick={nextReview}
                                    aria-label="Next review"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Current Review */}
                            <div className="reviews-review">
                                <div className="reviews-review-header">
                                    <h3 className="reviews-review-name">{currentReview.name}</h3>
                                    <span className="reviews-review-location">{currentReview.location}</span>
                                </div>
                                <div className="reviews-review-text">
                                    <p>{currentReview.text}</p>
                                </div>
                            </div>

                            {/* Review Counter */}
                            <div className="reviews-counter">
                                {currentReviewIndex + 1} / {reviews.length}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Reviews;

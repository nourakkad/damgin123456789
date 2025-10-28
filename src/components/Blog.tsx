import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Blog.css';
import { getLangFromPath, t, Lang } from '../utils/i18n';

const Blog: React.FC = () => {
  const location = useLocation();
  const [lang, setLang] = useState<Lang>(getLangFromPath(location.pathname));
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setLang(getLangFromPath(location.pathname));
  }, [location.pathname]);

  // News data from Home component
  const newsData = [
    {
      id: 1,
      title: 'Damascus Gin Lands in Japan',
      excerpt: 'Our flagship gin has been recognized for its exceptional quality and unique flavor profile at the prestigious International Spirits Competition.',
      image: '/images/news/blog-1.jpg',
      date: '2024-01-15',
      category: 'News'
    },
    {
      id: 2,
      title: 'Our Second Batch is Underway',
      excerpt: 'Discover the meticulous process behind crafting our signature gin, from botanical selection to the final distillation.',
      image: '/images/news/blog-2.jpg',
      date: '2024-01-10',
      category: 'News'
    },
    {
      id: 3,
      title: 'A Greener Spirit',
      excerpt: '',
      image: '/images/news/blog-3.jpg',
      date: '2025-05-20',
      category: 'News'
    },
    {
      id: 4,
      title: 'The Story Continues',
      excerpt: '',
      image: '/images/news/blog-4.jpg',
      date: '2025-06-28',
      category: 'News'
    },
    {
      id: 5,
      title: 'Planting the Future',
      excerpt: '',
      image: '/images/news/blog-5.jpg',
      date: '2025-08-28',
      category: 'News'
    }
  ];

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(newsData.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleReadMore = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="blog" style={{ overflowX: 'hidden' }}>
      {/* Hero Section - Matching Our Story Design */}
      <section className="blog-hero">
        <div className="container-grid">
          <div className="corners">
            <div className="text-content">
              <h2 className="title">{t(lang, 'blog.heroTitle')}</h2>
              <h3 className="subtitle">{t(lang, 'blog.heroSubtitle')}</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="news-section">
          <div className="news-grid">
            {currentPosts.map((post) => (
              <article key={post.id} className="news-card">
                <div className="news-image">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/news/news-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-category">{t(lang as Lang, `blog.posts.${post.id}.category`)}</span>
                    <span className="news-date">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="news-title">{t(lang as Lang, `blog.posts.${post.id}.title`)}</h3>
                  <p className="news-excerpt">{t(lang as Lang, `blog.posts.${post.id}.excerpt`)}</p>
                  <button 
                    className="read-more-btn"
                    onClick={() => handleReadMore(post.id)}
                  >
                    {t(lang as Lang, 'blog.readMoreBtn')}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {t(lang as Lang, 'blog.prev')}
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t(lang as Lang, 'blog.next')}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Blog; 
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BlogPost.css';
import { t, getLangFromPath } from '../utils/i18n';

interface BlogPostData {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

// Consolidate static posts inside component; see full list below

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');


  const blogPosts: BlogPostData[] = [
    {
      id: 1,
      title: 'Damascus Gin Lands in Japan!',
      excerpt: '',
      content: `
       <h2>Our Environmental Philosophy</h2>
        <p>After several months travelling across the seas, the first shipment of Damascus Gin has officially arrived in Japan.</p>
        <p>Following a few days at customs, Damascus Gin has finally made its debut on the “Land of the Samurai.” </p>
        <p>Now available at The Ancient World shop, Damascus Gin is ready to bring a taste of the Levant to Japan, blending tradition and innovation in each bottle.</p>
        <p>We hope it becomes a favorite among Japanese gin enthusiasts and paves the way for Damascus Gin to expand to other locations across the country. </p>
        <p>Cheers to new beginnings in Japan!</p>
        
      
      `,
      image: '/images/news/blog-1.jpg',
      date: '2024-06-29',
      category: 'News',
      author: 'Damascus Gin Team',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Our Second Batch is Underway!',
      excerpt: '',
      content: `
       
        <p>We're excited to announce that our second batch of Damascus Gin is officially in the works! Building on the success of our first batch, we’ve embarked on bottling, labelling, and packaging this latest production, ensuring that every bottle maintains the unique, high-quality expertise that defines Damascus Gin. Each bottle is carefully prepared by hand, with attention to detail at every stage, from start to finish.</p>
        <p>We've just received a fresh batch of small roses from Damascus, which will be placed into small bags for each bottle. </p>
        <p>This addition makes a perfect garnish, enhancing the unique experience of enjoying Damascus Gin.</p>
        <p>Our small-batch, handcrafted process means that each production of Damascus Gin has slight flavor tones, giving every batch a distinctive character. </p>
        <p>After extensive tasting sessions, we’re pleased with the outcome—the flavor of this second batch closely matches the first and may even be a touch more refined. </p>
        <p>Looking ahead, we’re actively exploring opportunities to expand Damascus Gin's distribution throughout Europe and the Americas, eager to share our creation with new audiences across the globe.</p>
        <p>We envision Damascus Gin sailing the seas, reaching gin enthusiasts worldwide who seek a spirit with a true story and taste. </p>
        <p>Stay tuned as we bring Damascus Gin to even more people, one handcrafted bottle at a time!</p>
      `,
      image: '/images/news/blog-2.jpg',
      date: '2024-10-01',
      category: 'News',
      author: 'Damascus Gin Team',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'A Greener Spirit',
      excerpt: '',
      content: `
        <h2>Damascus Gin’s Path to Sustainability</h2>  
        <p>At Damascus Gin, we believe a good drink should do good too. Born in Lebanon, made with the finest ingredients from both Lebanon and Syria, our gin is more than a blend of botanicals—it's a statement of care for the environment and the communities around us.</p>
        <p>We’re not perfect, but we’re committed. From sourcing organic juniper and Damascus roses locally, to distilling at a solar-powered winery, every step of our process is guided by respect for the land. We recycle water to irrigate nearby vineyards, use recycled glass for our bottles, and are constantly working to find better packaging options that don’t harm the planet.</p>
        <p>We also know that shipping products leaves a footprint. That’s why we’re launching a tree-planting project in Wata Al Joz, Lebanon, to help offset our emissions. It’s one of many small steps we’re taking—because change comes bottle by bottle.</p>
        <p>Our labels and design come from young local talents, adding another layer of meaning to each bottle: one of hope, resilience, and shared heritage between Syria and Lebanon.</p>
        <p>Sustainability isn’t just a checkbox. It’s a journey we’re proud to walk—with our team, our land, and everyone who raises a glass with us.</p>
        `,
      image: '/images/news/blog-3.jpg',
      date: '2025-20-07',
      category: 'News',
      author: 'Damascus Gin Team',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'The Story Continues – Batch No. 3',
      excerpt: '',
      content: `
        <h2>Each batch of Damascus Gin tells its own story.</h2>
        <p>Born again, Batch No. 3 is shaped by the same hands, guided by the same heart, but touched by time, weather, and the quiet mysteries of nature.</p>
        <p>Because we craft our gin in small batches, no two are ever exactly the same. And that’s part of the magic. The Aleppo pistachios, among the finest in the world, bring their soft, nutty warmth. The Damascus rose whispers its fragrance. The pure mountain spring water holds it all together like memory in a bottle ensuring that the juniper shows its presence.</p>
        <p>We do everything ourselves, slowly, intentionally. From distillation to bottling, from sealing each bottle in wax to gently laying it in its box, ready to travel out into the world.</p>
        <p>Batch No. 3 may have little differences, but the essence is unchanged: a gin born of place, passion, and patience.</p>
        <p>Drink it slowly. Let it tell you its version of the story.</p>
        
       
      `,
      image: '/images/news/blog-4.jpg',
      date: '2023-12-28',
      category: 'News',
      author: 'Damascus Gin Team',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Planting the Future: 20 Syrian Juniper Trees ',
      excerpt: '',
      content: `
       <h2>Take Root at Bybline Winery</h2>
        <p>At Bybline Winery, sustainability and tradition go hand in hand. This year we took a significant step toward securing the future of Damascus Gin by planting 20 Syrian Juniper trees (Juniperus drupacea) on the winery grounds. Known for its aromatic berries, this native and rare juniper species is the heart and soul of our gin, infusing it with the distinctive flavors that make Damascus Gin truly unique. Few gins in the world use this juniper in its production.</p>
        <p>The decision to plant these trees reflects our commitment to sustainability. By cultivating our own juniper, we ensure a reliable, eco-friendly source of this essential ingredient, reducing our reliance on wild harvesting and preserving the natural ecosystem. It’s a small but meaningful step toward a greener future for our distillery.</p>
        <p>The planting day was a special occasion, filled with energy and passion. Jonas, the son of our master distiller Joseph, was at the front, digging, planting, and watering each tree with care. His enthusiasm was infectious, and it’s clear that the legacy of Damascus Gin runs deep in his veins. We hope that one day, Jonas will take the reins of the winery and continue the tradition of crafting exceptional wines and spirits with the same dedication and love that his father has put into every bottle.</p>
        <p>As these trees grow, so does our promise to sustainability and innovation. Join us on this journey and raise a glass to a future built on tradition and passion.</p>
        <p>Stay tuned for more updates and photos of our juniper trees as they grow!</p>
        <p>Damascus Gin: Crafted with care, rooted in tradition.</p>
        
        
        `,
      image: '/images/news/blog-5.jpg',
      date: '2023-12-20',
      category: 'News',
      author: 'Damascus Gin Team',
      readTime: '10 min read'
    }
  ];

  const post = (() => {
    const numericId = parseInt(id || '', 10);
    return blogPosts.find((p) => p.id === numericId) || null;
  })();

  if (!post) {
    return (
      <div className="blog-post">
        <div className="container">
          <div className="post-not-found">
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/blog')} className="back-btn">
              {t(lang as any, 'blog.backToBlog')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post" style={{ overflowX: 'hidden' }}>
      <div className="container">
        <div className="post-header">
          <button onClick={() => navigate('/blog')} className="back-btn">
            ← {t(lang as any, 'blog.backToBlog')}
          </button>
          <div className="post-meta">
            <span className="post-category">{t(lang as any, `blog.posts.${id}.category`)}</span>
            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
            <span className="post-author">{t(lang as any, 'blog.by')} {t(lang as any, `blog.details.${id}.author`) || post.author}</span>
            <span className="post-read-time">{t(lang as any, `blog.details.${id}.readTime`) || post.readTime}</span>
          </div>
          <h1 className="post-title">{t(lang as any, `blog.posts.${id}.title`)}</h1>
          <p className="post-excerpt">{t(lang as any, `blog.posts.${id}.excerpt`)}</p>
        </div>
        
        <div className="post-image">
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
        
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: ((t(lang as any, `blog.details.${id}.content`) as string) || post.content) as string }}
        />
      </div>
    </div>
  );
};

export default BlogPost;

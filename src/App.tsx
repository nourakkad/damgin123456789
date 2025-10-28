import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Cocktails from './components/Cocktails';
import WhereToBuy from './components/WhereToBuy';
import Awards from './components/Awards';
import AgeVerification from './components/AgeVerification';
import { getLangFromPath } from './utils/i18n';

function DirectionSetter() {
  const location = useLocation();
  useEffect(() => {
    const lang = getLangFromPath(location.pathname);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.body.classList.toggle('rtl', dir === 'rtl');
    // Prevent horizontal scroll globally without editing CSS files
    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    const prevBodyOverflowX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = prevHtmlOverflowX;
      document.body.style.overflowX = prevBodyOverflowX;
    };
  }, [location.pathname]);
  return null;
}

function RootRedirect() {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');
  return <Navigate to={`/${lang}/`} replace />;
}

function LangWithoutSlashRedirect() {
  const { pathname } = useLocation();
  // pathname like /en -> redirect to /en/
  return <Navigate to={`${pathname}/`} replace />;
}

function RedirectToLangPath({ to }: { to: string }) {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');
  const clean = to.startsWith('/') ? to : `/${to}`;
  return <Navigate to={`/${lang}${clean}`} replace />;
}

function NotFoundRedirect() {
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');
  return <Navigate to={`/${lang}/`} replace />;
}

function RedirectBlogIdLegacy() {
  const { id } = useParams();
  const location = useLocation();
  const lang = getLangFromPath(location.pathname, 'en');
  return <Navigate to={`/${lang}/blog/${id}`} replace />;
}

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showAgeVerification, setShowAgeVerification] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
      setShowAgeVerification(false);
    }
  }, []);

  const handleAgeVerification = (isOver18: boolean) => {
    if (isOver18) {
      setIsAgeVerified(true);
      setShowAgeVerification(false);
      localStorage.setItem('ageVerified', 'true');
    } else {
      // Redirect to a different page or show message
      alert('Your journey hasn’t started yet, young wanderer.');
    }
  };

  if (showAgeVerification) {
    return <AgeVerification onVerify={handleAgeVerification} />;
  }

  return (
    <Router>
      <DirectionSetter />
      <div className="App">
        <Navigation />
        <Routes>
          {/* Redirect non-prefixed to language-prefixed */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/our-story" element={<RedirectToLangPath to="/our-story" />} />
          <Route path="/gallery" element={<RedirectToLangPath to="/gallery" />} />
          <Route path="/blog" element={<RedirectToLangPath to="/blog" />} />
          <Route path="/blog/:id" element={<RedirectBlogIdLegacy />} />
          <Route path="/cocktails" element={<RedirectToLangPath to="/cocktails" />} />
          <Route path="/where-to-buy" element={<RedirectToLangPath to="/where-to-buy" />} />
          <Route path="/awards" element={<RedirectToLangPath to="/awards" />} />

          {/* Language-prefixed routes */}
          <Route path=":lang" element={<LangWithoutSlashRedirect />} />
          <Route path=":lang/" element={<Home />} />
          <Route path=":lang/our-story" element={<OurStory />} />
          <Route path=":lang/gallery" element={<Gallery />} />
          <Route path=":lang/blog" element={<Blog />} />
          <Route path=":lang/blog/:id" element={<BlogPost />} />
          <Route path=":lang/cocktails" element={<Cocktails />} />
          <Route path=":lang/where-to-buy" element={<WhereToBuy />} />
          <Route path=":lang/awards" element={<Awards />} />

          {/* Fallback */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

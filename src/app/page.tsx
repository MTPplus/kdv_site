'use client';

import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/dvkran/Header';
import { Footer } from '@/components/dvkran/Footer';
import { HomePage } from '@/components/dvkran/HomePage';
import { AboutPage } from '@/components/dvkran/AboutPage';
import { ServicesPage } from '@/components/dvkran/ServicesPage';
import { ProjectsPage } from '@/components/dvkran/ProjectsPage';
import { ContactsPage } from '@/components/dvkran/ContactsPage';
import { UI, type Lang, type PageId } from '@/components/dvkran/data';

const LANG_STORAGE_KEY = 'dvkran-lang';

export default function Home() {
  // Lazy-initialize page from URL hash so refresh keeps current page
  const [page, setPage] = useState<PageId>(() => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#/, '');
    const valid: PageId[] = ['home', 'about', 'service', 'project', 'contacts'];
    return (valid as string[]).includes(hash) ? (hash as PageId) : 'home';
  });

  // Lazy-initialize language from localStorage (default: ru)
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'ru';
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return stored === 'en' || stored === 'ru' ? stored : 'ru';
  });

  const [showTop, setShowTop] = useState(false);

  // Listen for hash changes (e.g., browser back/forward)
  useEffect(() => {
    const valid: PageId[] = ['home', 'about', 'service', 'project', 'contacts'];
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '');
      if ((valid as string[]).includes(h)) {
        setPage(h as PageId);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Persist language choice + update <html lang> attribute
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Update document title to match language
  useEffect(() => {
    document.title = UI[lang].brandTitle;
  }, [lang]);

  const handleNavigate = useCallback((next: PageId) => {
    setPage(next);
    if (typeof window !== 'undefined') {
      const newHash = next === 'home' ? '' : `#${next}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash || window.location.pathname);
      }
    }
  }, []);

  const handleLangChange = useCallback((next: Lang) => {
    setLang(next);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <Header
        current={page}
        lang={lang}
        onNavigate={handleNavigate}
        onLangChange={handleLangChange}
      />

      <main className="dv-main" style={{ flex: 1, display: 'block' }}>
        {page === 'home' && <HomePage lang={lang} onNavigate={handleNavigate} />}
        {page === 'about' && <AboutPage lang={lang} />}
        {page === 'service' && <ServicesPage lang={lang} />}
        {page === 'project' && <ProjectsPage lang={lang} />}
        {page === 'contacts' && <ContactsPage lang={lang} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} />

      <button
        className={`dv-to-top${showTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label={UI[lang].backToTop}
      >
        ↑
      </button>
    </div>
  );
}

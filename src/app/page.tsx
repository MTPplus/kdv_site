'use client';

import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/dvkran/Header';
import { Footer } from '@/components/dvkran/Footer';
import { HomePage } from '@/components/dvkran/HomePage';
import { AboutPage } from '@/components/dvkran/AboutPage';
import { ServicesPage } from '@/components/dvkran/ServicesPage';
import { ProjectsPage } from '@/components/dvkran/ProjectsPage';
import { ContactsPage } from '@/components/dvkran/ContactsPage';
import { AdminPage } from '@/components/dvkran/AdminPage';
import { UI, type Lang, type PageId } from '@/components/dvkran/data';
import { loadContent, type DynamicContent } from '@/components/dvkran/content-loader';

const LANG_STORAGE_KEY = 'dvkran-lang';

type View = PageId | 'admin';

export default function Home() {
  // Lazy-initialize view from URL hash. Supports #admin in addition to page hashes.
  const [view, setView] = useState<View>(() => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#/, '');
    if (hash === 'admin') return 'admin';
    const valid: PageId[] = ['home', 'about', 'service', 'project', 'contacts'];
    return (valid as string[]).includes(hash) ? (hash as PageId) : 'home';
  });

  // page derived from view (admin doesn't change current page in header)
  const page: PageId = view === 'admin' ? 'home' : view;

  // Lazy-initialize language from localStorage (default: ru)
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'ru';
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return stored === 'en' || stored === 'ru' ? stored : 'ru';
  });

  // Dynamic content loaded from admin API (with static fallback)
  const [content, setContent] = useState<DynamicContent>({ loaded: false });

  const [showTop, setShowTop] = useState(false);

  // Load dynamic content on mount + every 60s (less frequent to avoid hammering Django)
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const reload = async () => {
      const c = await loadContent();
      if (active) setContent(c);
      // Re-schedule (longer interval when loaded, shorter on failure)
      timer = setTimeout(reload, c.loaded ? 60_000 : 15_000);
    };
    reload();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  // Listen for hash changes (e.g., browser back/forward)
  useEffect(() => {
    const valid: View[] = ['home', 'about', 'service', 'project', 'contacts', 'admin'];
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '');
      if ((valid as string[]).includes(h)) {
        setView(h as View);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

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
    setView(next);
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

  const handleExitAdmin = useCallback(() => {
    setView('home');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- Admin view: full-screen, no header/footer ----------
  if (view === 'admin') {
    return <AdminPage onExit={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <Header
        current={page}
        lang={lang}
        onNavigate={handleNavigate}
        onLangChange={handleLangChange}
      />

      <main className="dv-main" style={{ flex: 1, display: 'block' }}>
        {view === 'home' && (
          <HomePage lang={lang} onNavigate={handleNavigate} content={content} />
        )}
        {view === 'about' && <AboutPage lang={lang} content={content} />}
        {view === 'service' && <ServicesPage lang={lang} content={content} />}
        {view === 'project' && <ProjectsPage lang={lang} content={content} />}
        {view === 'contacts' && <ContactsPage lang={lang} content={content} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} content={content} />

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

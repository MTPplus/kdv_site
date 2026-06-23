'use client';

import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/dvkran/Header';
import { Footer } from '@/components/dvkran/Footer';
import { HomePage } from '@/components/dvkran/HomePage';
import { AboutPage } from '@/components/dvkran/AboutPage';
import { ContactsPage } from '@/components/dvkran/ContactsPage';
import { AdminPage } from '@/components/dvkran/AdminPage';
import { UI, type Lang, type PageId } from '@/components/dvkran/data';
import { loadContent, type DynamicContent } from '@/components/dvkran/content-loader';

const LANG_STORAGE_KEY = 'dvkran-lang';

type View = PageId | 'admin';

const VALID_VIEWS: View[] = ['home', 'about', 'contacts', 'admin'];

export default function Home() {
  // ── SSR-safe state ──────────────────────────────────────────────
  // All state starts with defaults that are identical on server and client.
  // Client-only values (URL hash, localStorage) are read in useEffect AFTER
  // hydration completes, then state is updated to trigger a re-render.
  // This guarantees zero hydration mismatch.
  const [view, setView] = useState<View>('home');
  const [lang, setLang] = useState<Lang>('ru');
  const [mounted, setMounted] = useState(false);

  // Dynamic content loaded from admin API (with static fallback)
  const [content, setContent] = useState<DynamicContent>({ loaded: false });
  const [showTop, setShowTop] = useState(false);

  // page derived from view (admin doesn't change current page in header)
  const page: PageId = view === 'admin' ? 'home' : view;

  // ── Mount: read URL hash + saved language ──────────────────────
  // This runs AFTER hydration, so the initial client render always matches
  // the server HTML (both use the default 'home'/'ru' values).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted flag is the standard SSR-safe pattern
    setMounted(true);

    // Restore view from URL hash
    const hash = window.location.hash.replace(/^#/, '');
    if ((VALID_VIEWS as string[]).includes(hash)) {
      setView(hash as View);
    }

    // Restore language from localStorage
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'ru') {
      setLang(stored);
    }
  }, []);

  // ── Listen for hash changes (browser back/forward) ─────────────
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '');
      if ((VALID_VIEWS as string[]).includes(h)) {
        setView(h as View);
      } else if (h === '') {
        setView('home');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // ── Load dynamic content on mount + every 60s ──────────────────
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const reload = async () => {
      const c = await loadContent();
      if (active) setContent(c);
      timer = setTimeout(reload, c.loaded ? 60_000 : 15_000);
    };
    reload();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  // ── Scroll to top on view change ───────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  // ── Back-to-top visibility ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Persist language choice + update <html lang> ───────────────
  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // ── Update document title to match language ────────────────────
  useEffect(() => {
    document.title = UI[lang].brandTitle;
  }, [lang]);

  // ── Navigation handlers ────────────────────────────────────────
  const handleNavigate = useCallback((next: PageId) => {
    setView(next);
    const newHash = next === 'home' ? '' : `#${next}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash || window.location.pathname);
    }
  }, []);

  const handleLangChange = useCallback((next: Lang) => {
    setLang(next);
  }, []);

  const handleExitAdmin = useCallback(() => {
    setView('home');
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Admin view: full-screen, no header/footer ──────────────────
  // Only render admin after mount (it uses localStorage/browser APIs).
  if (view === 'admin' && mounted) {
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

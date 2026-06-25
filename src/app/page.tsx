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
  const [view, setView] = useState<View>('home');
  const [lang, setLang] = useState<Lang>('ru');
  const [mounted, setMounted] = useState(false);

  const [content, setContent] = useState<DynamicContent>({ loaded: false });
  const [showTop, setShowTop] = useState(false);

  const page: PageId = view === 'admin' ? 'home' : view;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mounted flag is the standard SSR-safe pattern
    setMounted(true);

    const hash = window.location.hash.replace(/^#/, '');
    if ((VALID_VIEWS as string[]).includes(hash)) {
      setView(hash as View);
    }

    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'ru') {
      setLang(stored);
    }
  }, []);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.title = UI[lang].brandTitle;
  }, [lang]);

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
  if (view === 'admin' && mounted) {
    return <AdminPage onExit={handleExitAdmin} />;
  }

  // ── Main layout: ALL sections rendered in DOM for SEO/AI ──────
  // Non-active sections are hidden via CSS but present in HTML so
  // search engines and AI crawlers can read all content.
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <Header
        current={page}
        lang={lang}
        onNavigate={handleNavigate}
        onLangChange={handleLangChange}
      />

      <main className="dv-main" style={{ flex: 1, display: 'block' }}>
        {/* Home — always rendered, visible when active */}
        <div style={{ display: view === 'home' ? 'block' : 'none' }} aria-hidden={view !== 'home'}>
          <HomePage lang={lang} onNavigate={handleNavigate} content={content} />
        </div>

        {/* About — rendered in DOM for SEO, hidden when not active */}
        <div style={{ display: view === 'about' ? 'block' : 'none' }} aria-hidden={view !== 'about'}>
          <AboutPage lang={lang} content={content} />
        </div>

        {/* Contacts — rendered in DOM for SEO, hidden when not active */}
        <div style={{ display: view === 'contacts' ? 'block' : 'none' }} aria-hidden={view !== 'contacts'}>
          <ContactsPage lang={lang} content={content} />
        </div>
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

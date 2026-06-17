'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_ITEMS, UI, type Lang, type PageId } from './data';

interface HeaderProps {
  current: PageId;
  lang: Lang;
  onNavigate: (page: PageId) => void;
  onLangChange: (lang: Lang) => void;
}

export function Header({ current, lang, onNavigate, onLangChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Refs to each menu link + the snake indicator element
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const snakeRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const t = UI[lang];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Position the snake indicator imperatively.
  // Snake does NOT follow the cursor — it only jumps to the currently active page item.
  // On the home page, the snake fades out (no active menu item).
  const positionSnake = () => {
    const header = headerRef.current;
    const snake = snakeRef.current;
    if (!header || !snake) return;

    // On the home page, hide the snake with a smooth fade.
    if (current === 'home') {
      snake.style.opacity = '0';
      return;
    }

    const link = linkRefs.current[current];
    if (!link) {
      snake.style.opacity = '0';
      return;
    }

    const linkRect = link.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    snake.style.left = `${linkRect.left - headerRect.left}px`;
    snake.style.width = `${linkRect.width}px`;
    snake.style.opacity = '1';
  };

  useLayoutEffect(() => {
    positionSnake();
  }, [current, lang]);

  // Recompute on resize (only repositions if there's an active item)
  useEffect(() => {
    const handleResize = () => positionSnake();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [current, lang]);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleHome = () => {
    onNavigate('home');
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="dv-header">
      {/* Snake indicator: a single coral bar pinned to the very bottom of the header.
          Jumps to the active menu item after click. No hover tracking.
          Fades out smoothly when on the home page. */}
      <div
        ref={snakeRef}
        className="dv-menu__snake"
        aria-hidden="true"
        style={{ left: '0px', width: '0px', opacity: 0 }}
      />
      <div className="dv-container">
        <div className="dv-header__wrapper">
          <button
            className={`dv-menu-toggle${mobileOpen ? ' active' : ''}`}
            aria-label={t.menuOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a
            className="dv-logo"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleHome();
            }}
            aria-label={t.backToHome}
          ></a>

          <nav className={`dv-menu${mobileOpen ? ' open' : ''}`}>
            <ul className="dv-menu__list">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className={`dv-menu__item${current === item.id ? ' active' : ''}`}
                >
                  <a
                    ref={(el) => {
                      linkRefs.current[item.id] = el;
                    }}
                    href={`/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.id);
                    }}
                  >
                    {item.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="dv-lang">
              <a
                href="/ru/"
                className={`dv-lang__item${lang === 'ru' ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onLangChange('ru');
                }}
              >
                ru
              </a>
              <a
                href="/en/"
                className={`dv-lang__item${lang === 'en' ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onLangChange('en');
                }}
              >
                en
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

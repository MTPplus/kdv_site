'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_ITEMS, type PageId } from './data';

interface HeaderProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

export function Header({ current, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [hovered, setHovered] = useState<PageId | null>(null);

  // Refs to each menu link + the snake indicator element
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const snakeRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

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

  // Position the snake indicator imperatively — pinned to the bottom of the header,
  // left/width matches the active (or hovered) menu item.
  // We update DOM directly without setState to avoid the "setState in effect" lint rule
  // AND to get smoother animation (no React re-render).
  const positionSnake = () => {
    const targetId = hovered ?? current;
    const link = linkRefs.current[targetId];
    const header = headerRef.current;
    const snake = snakeRef.current;
    if (!link || !header || !snake) return;

    const linkRect = link.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    snake.style.left = `${linkRect.left - headerRect.left}px`;
    snake.style.width = `${linkRect.width}px`;
    snake.style.opacity = '1';
  };

  useLayoutEffect(() => {
    positionSnake();
  }, [hovered, current]);

  // Recompute on resize
  useEffect(() => {
    const handleResize = () => positionSnake();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hovered, current]);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
    setHovered(null);
  };

  const handleHome = () => {
    onNavigate('home');
    setMobileOpen(false);
    setHovered(null);
  };

  return (
    <header ref={headerRef} className="dv-header">
      {/* Snake indicator: a single coral bar pinned to the very bottom of the header.
          It slides left/width between menu items with smooth transition.
          Lives directly inside .dv-header so bottom:0 == bottom of header. */}
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
            aria-label="Открыть меню"
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
            aria-label="КРАН-ДВ — на главную"
          ></a>

          <nav
            className={`dv-menu${mobileOpen ? ' open' : ''}`}
            onMouseLeave={() => setHovered(null)}
          >
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
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                  >
                    {item.label}
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
                  setLang('ru');
                }}
              >
                ru
              </a>
              <a
                href="/en/"
                className={`dv-lang__item${lang === 'en' ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setLang('en');
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

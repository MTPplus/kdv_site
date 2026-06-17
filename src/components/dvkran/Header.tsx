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
  const snakeRef = useRef<HTMLLIElement | null>(null);
  const menuListRef = useRef<HTMLUListElement | null>(null);

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

  // Position the snake indicator imperatively — updates DOM directly without setState.
  // This avoids the "setState in effect" lint error AND gives smoother animation
  // because we update the same DOM node without re-rendering React.
  const positionSnake = () => {
    const targetId = hovered ?? current;
    const link = linkRefs.current[targetId];
    const list = menuListRef.current;
    const snake = snakeRef.current;
    if (!link || !list || !snake) return;

    const linkRect = link.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    snake.style.left = `${linkRect.left - listRect.left}px`;
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
    <header className="dv-header">
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
            <ul ref={menuListRef} className="dv-menu__list">
              {/* Snake indicator: single coral bar attached to bottom of header.
                  Slides between items with smooth left+width transition. */}
              <li
                ref={snakeRef}
                className="dv-menu__snake"
                aria-hidden="true"
                style={{ left: '0px', width: '0px', opacity: 0 }}
              />
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

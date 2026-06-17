'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS, type PageId } from './data';

interface HeaderProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

export function Header({ current, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

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

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleHome = () => {
    onNavigate('home');
    setMobileOpen(false);
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

          <nav className={`dv-menu${mobileOpen ? ' open' : ''}`}>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 14, listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className={`dv-menu__item${current === item.id ? ' active' : ''}`}
                >
                  <a
                    href={`/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.id);
                    }}
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

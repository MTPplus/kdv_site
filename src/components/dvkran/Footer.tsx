'use client';

import { UI, type Lang, type PageId } from './data';

interface FooterProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = UI[lang];

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
  };
  const goContacts = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('contacts');
  };

  return (
    <footer className="dv-footer">
      <div className="dv-container">
        <div className="dv-footer__row">
          <div className="dv-footer__left">
            <a
              className="dv-footer__logo"
              href="/"
              onClick={goHome}
              aria-label={t.backToHome}
            ></a>
            <div className="dv-footer__text">{t.footerText}</div>
          </div>
          <div className="dv-footer__right">
            <nav className="dv-footer__contacts">
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__number"
                  href={`tel:${t.phoneHref}`}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {t.phone}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a className="dv-contacts__email" href={`mailto:${t.email}`}>
                  {t.email}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__street"
                  href="/kontakty/"
                  onClick={goContacts}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {t.addressFooter}
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="dv-footer__copyright">
          <div className="dv-copyright__text">{t.copyright}</div>
          <div className="dv-social">
            <a
              className="dv-social__item"
              href="https://vk.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ВКонтакте"
            ></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

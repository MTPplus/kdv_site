'use client';

import { siteConfig, type PageId } from './data';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
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
              aria-label="КРАН-ДВ — на главную"
            ></a>
            <div className="dv-footer__text">
              Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности
              для выполнения крановых проектов различного уровня сложности
            </div>
          </div>
          <div className="dv-footer__right">
            <nav className="dv-footer__contacts">
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__number"
                  href={`tel:${siteConfig.phoneHref}`}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a className="dv-contacts__email" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__street"
                  href="/kontakty/"
                  onClick={goContacts}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {siteConfig.addressFooter}
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="dv-footer__copyright">
          <div className="dv-copyright__text">{siteConfig.copyright}</div>
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

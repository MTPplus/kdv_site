'use client';

import { UI, type Lang, type PageId } from './data';
import { getSettings, type DynamicContent } from './content-loader';

interface FooterProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
  content: DynamicContent;
}

export function Footer({ lang, onNavigate, content }: FooterProps) {
  // If dynamic content is loaded, override static UI strings with DB values
  const settings = getSettings(content);
  const phone = settings.phone;
  const phoneHref = phone.replace(/[^+\d]/g, '');
  const email = settings.email;
  const addressFooter = settings.addressFooter[lang];
  const copyright = settings.copyright[lang];

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
              aria-label={UI[lang].backToHome}
            ></a>
            <div className="dv-footer__text">
              {content.loaded
                ? (lang === 'ru'
                    ? 'Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности'
                    : 'KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity')
                : UI[lang].footerText}
            </div>
          </div>
          <div className="dv-footer__right">
            <nav className="dv-footer__contacts">
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__number"
                  href={`tel:${phoneHref}`}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {phone}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a className="dv-contacts__email" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
              <div className="dv-contacts__item">
                <a
                  className="dv-contacts__street"
                  href="/kontakty/"
                  onClick={goContacts}
                  style={{ color: '#fff', textDecoration: 'none' }}
                >
                  {addressFooter}
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="dv-footer__copyright">
          <div className="dv-copyright__text">{copyright}</div>
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

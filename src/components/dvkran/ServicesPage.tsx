'use client';

import { SERVICES, UI, type Lang } from './data';
import { getServiceItems, getSettings, type DynamicContent } from './content-loader';

interface ServicesPageProps {
  lang: Lang;
  content: DynamicContent;
}

export function ServicesPage({ lang, content }: ServicesPageProps) {
  const t = UI[lang];
  const items = getServiceItems(content);
  const settings = getSettings(content);
  const title = content.loaded ? (lang === 'ru' ? 'Услуги компании' : 'Company services') : SERVICES.title[lang];

  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{title}</div>
      <div className="dv-services">
        <div className="dv-services-tile">
          {items.map((item, idx) => (
            <div key={idx} className="dv-services__item single-element">
              <div className="single-element__image">
                <img src={item.image} alt={item.title[lang]} />
              </div>
              <div className="dv-single-element__title">{item.title[lang]}</div>
              <a
                href="#"
                className="dv-button-transparent"
                onClick={(e) => e.preventDefault()}
              >
                {t.more}
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginBottom: 75 }}>
          <a
            style={{ color: '#ee7a04' }}
            className="dv-button-transparent"
            href={settings.referenceListUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.downloadReferenceShort}
          </a>
        </p>
      </div>
    </div>
  );
}

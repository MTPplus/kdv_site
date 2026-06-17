'use client';

import { SERVICES, siteConfig } from './data';

export function ServicesPage() {
  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{SERVICES.title}</div>
      <div className="dv-services">
        <div className="dv-services-tile">
          {SERVICES.items.map((item, idx) => (
            <div key={idx} className="dv-services__item single-element">
              <div className="single-element__image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="dv-single-element__title">{item.title}</div>
              <a
                href="#"
                className="dv-button-transparent"
                onClick={(e) => e.preventDefault()}
              >
                Подробнее
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginBottom: 75 }}>
          <a
            style={{ color: '#ee7a04' }}
            className="dv-button-transparent"
            href={SERVICES.referenceListUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cкачать референс-лист
          </a>
        </p>
      </div>
    </div>
  );
}

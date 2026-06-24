'use client';

import { CONTACTS, type Lang } from './data';
import { getSettings, type DynamicContent } from './content-loader';

interface ContactsPageProps {
  lang: Lang;
  content: DynamicContent;
}

export function ContactsPage({ lang, content }: ContactsPageProps) {
  const settings = getSettings(content);
  const title = content.loaded ? (lang === 'ru' ? 'Контакты' : 'Contacts') : CONTACTS.title[lang];
  const officeName = content.loaded ? (lang === 'ru' ? 'Головной офис:' : 'Head office:') : CONTACTS.officeName[lang];
  const productionName = lang === 'ru' ? 'Производственная площадка:' : 'Production site:';
  const phoneLabel = content.loaded ? (lang === 'ru' ? 'Тел.:' : 'Tel.:') : CONTACTS.phoneLabel[lang];
  const emailLabel = content.loaded ? 'E-mail:' : CONTACTS.emailLabel[lang];
  const mapTitle = content.loaded ? (lang === 'ru' ? 'Карта — офис КРАН-ДВ' : 'Map — KRAN-DV office') : CONTACTS.mapTitle[lang];

  const productionAddress = settings.addressProduction?.[lang] ?? (lang === 'ru' ? '680031, г. Хабаровск, ул. Промышленная, 15' : '680031, Khabarovsk, Promyshlennaya st., 15');

  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{title}</div>

      <section className="dv-contacts-section">
        <div className="dv-contacts">
          <div className="dv-contacts__list">
            <div className="dv-contact">
              <div className="dv-contact__info">
                <div className="dv-contact__name">{officeName}</div>
                <div className="dv-contact__row">{settings.addressOffice[lang]}</div>

                <div className="dv-contact__name" style={{ marginTop: 30 }}>{productionName}</div>
                <div className="dv-contact__row">{productionAddress}</div>

                <div className="dv-contact__row" style={{ marginTop: 30 }}>
                  {phoneLabel}{' '}
                  {[settings.phone, settings.phoneAdditional].map((p, idx) => (
                    <span key={idx}>
                      {idx > 0 && ', '}
                      <a className="dv-contact__phone" href={`tel:${p.replace(/[^+\d]/g, '')}`}>
                        {p}
                      </a>
                    </span>
                  ))}
                </div>
                <div className="dv-contact__row">
                  {emailLabel}{' '}
                  <a className="dv-contact__email" href={`mailto:${settings.emailOffice}`}>
                    {settings.emailOffice}
                  </a>
                </div>
              </div>
              <div className="dv-contact__map">
                <iframe
                  src={settings.yandexMapSrc}
                  title={mapTitle}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { CONTACTS, type Lang } from './data';

interface ContactsPageProps {
  lang: Lang;
}

export function ContactsPage({ lang }: ContactsPageProps) {
  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{CONTACTS.title[lang]}</div>

      <section className="dv-contacts-section">
        <div className="dv-contacts">
          <div className="dv-contacts__list">
            <div className="dv-contact">
              <div className="dv-contact__info">
                <div className="dv-contact__name">{CONTACTS.officeName[lang]}</div>
                <div className="dv-contact__row">{CONTACTS.officeAddress[lang]}</div>
                <div className="dv-contact__row">
                  {CONTACTS.phoneLabel[lang]}{' '}
                  {CONTACTS.phones.map((p, idx) => (
                    <span key={idx}>
                      {idx > 0 && ', '}
                      <a className="dv-contact__phone" href={`tel:${p.replace(/[^+\d]/g, '')}`}>
                        {p}
                      </a>
                    </span>
                  ))}
                </div>
                <div className="dv-contact__row">
                  {CONTACTS.emailLabel[lang]}{' '}
                  <a className="dv-contact__email" href={`mailto:${CONTACTS.email}`}>
                    {CONTACTS.email}
                  </a>
                </div>
              </div>
              <div className="dv-contact__map">
                <iframe
                  src={CONTACTS.mapSrc}
                  title={CONTACTS.mapTitle[lang]}
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

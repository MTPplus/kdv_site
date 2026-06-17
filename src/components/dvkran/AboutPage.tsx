'use client';

import { ABOUT } from './data';

export function AboutPage() {
  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{ABOUT.title}</div>

      <section className="dv-single-section">
        <div className="dv-single">
          <div className="dv-word-seo">
            <div className="dv-word-seo__content">
              <div className="dv-word-seo__text">
                {ABOUT.text.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: 16 }}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="dv-word-seo__signature">{ABOUT.signature}</div>
              <div className="dv-word-seo__photo"></div>
            </div>
          </div>

          {/* Industries + geography */}
          <div className="dv-industry__title">{ABOUT.industryTitle}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              alignItems: 'start',
            }}
          >
            <div className="dv-industry__content">
              <ul className="dv-industry__list">
                {ABOUT.industries.map((ind, idx) => (
                  <li key={idx} className="dv-industry__text">
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dv-geography__content">
              <div className="dv-geography__map">
                <img
                  src="/images/dvkran/dev__resmap.png"
                  alt="География реализованных проектов"
                />
              </div>
            </div>
          </div>

          {/* Mt today tiles */}
          <div className="dv-mt-today__title">
            <span className="highlight">МИКРОТЕРМ ПЛЮС</span> сегодня
          </div>
          <div className="dv-tiles">
            {ABOUT.mtTodayTiles.map((tile, idx) => (
              <div className="dv-tile" key={idx}>
                <img src={tile.icon} alt={tile.text} />
                <div className="dv-tile__undertext">{tile.text}</div>
              </div>
            ))}
          </div>

          {/* Certificates gallery */}
          <div className="dv-industry__title">{ABOUT.certsTitle}</div>
          <div className="dv-sert__gallery">
            {ABOUT.certificates.map((src, idx) => (
              <a
                key={idx}
                className="dv-sert__slide"
                href={src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={src} alt={`Сертификат ${idx + 1}`} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

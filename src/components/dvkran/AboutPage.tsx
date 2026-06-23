'use client';

import { ABOUT, type Lang } from './data';
import { getAbout, type DynamicContent } from './content-loader';
import { SafeImg } from './SafeImg';

interface AboutPageProps {
  lang: Lang;
  content: DynamicContent;
}

// Fallback values used when dynamic content is missing fields
const GEO_MAP_ALT_FALLBACK: { ru: string; en: string } = {
  ru: 'География реализованных проектов',
  en: 'Geography of completed projects',
};

const CERTIFICATES_FALLBACK: string[] = [
  ...[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(
    (i) => `/images/dvkran/2023__05__sert${i}.jpg`
  ),
  ...[5, 4, 3, 2, 1].map((i) => `/images/dvkran/2023__05__review${i}.jpg`),
];

export function AboutPage({ lang, content }: AboutPageProps) {
  const about = getAbout(content);

  // Defensive: ensure all fields exist (some may be missing in older content.json)
  const geographyMapAlt = about.geographyMapAlt ?? GEO_MAP_ALT_FALLBACK;
  const certificates = about.certificates ?? CERTIFICATES_FALLBACK;

  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{about.title[lang]}</div>

      <section className="dv-single-section">
        <div className="dv-single">
          <div className="dv-word-seo">
            <div className="dv-word-seo__content">
              <div className="dv-word-seo__text">
                {about.text[lang].map((p, idx) => (
                  <p key={idx} style={{ marginBottom: 16 }}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="dv-word-seo__signature">{about.signature[lang]}</div>
              <div className="dv-word-seo__photo"></div>
            </div>
          </div>

          {/* Industries + geography */}
          <div className="dv-industry__title">{about.industryTitle[lang]}</div>
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
                {about.industries[lang].map((ind, idx) => (
                  <li key={idx} className="dv-industry__text">
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dv-geography__content">
              <div className="dv-geography__map">
                <SafeImg
                  src="/images/dvkran/dev__resmap.png"
                  alt={geographyMapAlt[lang] ?? GEO_MAP_ALT_FALLBACK[lang]}
                />
              </div>
            </div>
          </div>

          {/* Mt today tiles */}
          <div className="dv-mt-today__title">
            <span className="highlight">{about.mtTodayTitle[lang]}</span>
          </div>
          <div className="dv-tiles">
            {about.mtTodayTiles.map((tile, idx) => (
              <div className="dv-tile" key={idx}>
                <SafeImg src={tile.icon} alt={tile.text[lang]} />
                <div className="dv-tile__undertext">{tile.text[lang]}</div>
              </div>
            ))}
          </div>

          {/* Certificates gallery */}
          <div className="dv-industry__title">{about.certsTitle[lang]}</div>
          <div className="dv-sert__gallery">
            {certificates.map((src, idx) => (
              <a
                key={idx}
                className="dv-sert__slide"
                href={src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SafeImg src={src} alt={`Certificate ${idx + 1}`} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { ABOUT, type Lang } from './data';
import { getAbout, type DynamicContent } from './content-loader';

interface AboutPageProps {
  lang: Lang;
  content: DynamicContent;
}

export function AboutPage({ lang, content }: AboutPageProps) {
  const about = getAbout(content);

  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <h1 className="dv-page__title">{about.title[lang]}</h1>

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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

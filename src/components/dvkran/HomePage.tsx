'use client';

import { useState } from 'react';
import {
  KEY_PRODUCTS,
  HOME_SERVICES,
  HOME_PROJECTS,
  PROVIDER,
  CLIENTS,
  UI,
  siteConfig,
  type Lang,
  type PageId,
} from './data';
import { SubscribeForm } from './SubscribeForm';

interface HomePageProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
}

export function HomePage({ lang, onNavigate }: HomePageProps) {
  const t = UI[lang];
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <>
      {/* Hero / Face section */}
      <section className="dv-face-section">
        <div className="dv-container dv-face-banner">
          <div className="dv-face-block">
            <div className="dv-face-block__title">{t.heroTitle}</div>
            <div className="dv-face-block__description">{t.heroDescription}</div>
            <a
              className="dv-button"
              href="/service"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('service');
              }}
            >
              {t.learnMore}
            </a>
          </div>
        </div>
      </section>

      {/* Key products */}
      <section className="dv-key-products-section">
        <div className="dv-container">
          <div className="dv-key-products">
            <div className="dv-key-products__title">{t.productsTitle}</div>
            <div className="dv-key-products__view">
              <div className="dv-key-products__viewer">
                <img
                  className="key-products__image"
                  src={KEY_PRODUCTS[activeProduct].image}
                  alt={KEY_PRODUCTS[activeProduct].type[lang]}
                />
              </div>
              <div className="dv-key-products__list">
                {KEY_PRODUCTS.map((p, idx) => (
                  <a
                    key={idx}
                    className={`dv-key-products__item${idx === activeProduct ? ' active' : ''}`}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveProduct(idx);
                    }}
                    onMouseEnter={() => setActiveProduct(idx)}
                  >
                    <div className="key-products__type">{p.type[lang]}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="dv-services-section">
        <div className="dv-container">
          <div className="dv-services">
            <div className="dv-section-title dv-services__title">
              {t.engineeringServicesTitle}
            </div>
            <div className="dv-services__list">
              {HOME_SERVICES.map((s, idx) => (
                <a
                  key={idx}
                  className="dv-services__item"
                  href="/service"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('service');
                  }}
                >
                  <div className="single-element__image">
                    <img src={s.image} alt={s.title[lang]} />
                  </div>
                  <div className="dv-single-element__title">{s.title[lang]}</div>
                  <div className="dv-button-transparent">{t.more}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our projects preview */}
      <section className="dv-projects-section">
        <div className="dv-container">
          <div className="dv-project__header-tittle">{t.ourProjectsTitle}</div>
          <div className="dv-project__list">
            {HOME_PROJECTS.map((p, idx) => (
              <a
                key={idx}
                className="dv-project__item"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('project');
                }}
              >
                <img className="dv-project__img" src={p.image} alt={p.title[lang]} />
                <div className="dv-project__text-area">
                  <div className="dv-project__tittle">{p.title[lang]}</div>
                  <div className="dv-project__text">{p.text[lang]}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="dv-project__file">
            <a
              className="dv-button dv-project__button"
              href={siteConfig.referenceListUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.downloadReference}
            </a>
          </div>
        </div>
      </section>

      {/* Provider block */}
      <section className="dv-provider-section">
        <div className="dv-container">
          <div className="dv-provider__tittle">{PROVIDER.title[lang]}</div>
          <div className="dv-provider__text">
            {PROVIDER.paragraphs[lang].map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="dv-clients-section">
        <div className="dv-container">
          <div className="dv-clients__tittle">{t.ourClients}</div>
          <div className="dv-clients__wrapper">
            {CLIENTS.map((c, idx) => (
              <div className="dv-client" key={idx}>
                <img src={c} alt={`Client ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeForm lang={lang} />
    </>
  );
}

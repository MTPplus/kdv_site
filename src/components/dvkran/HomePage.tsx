'use client';

import { useState } from 'react';
import { UI, siteConfig, type Lang, type PageId } from './data';
import {
  getProducts,
  getHomeServices,
  getHomeProjects,
  getProvider,
  getClients,
  getSettings,
  type DynamicContent,
} from './content-loader';
import { SubscribeForm } from './SubscribeForm';
import { SafeImg } from './SafeImg';

interface HomePageProps {
  lang: Lang;
  onNavigate: (page: PageId) => void;
  content: DynamicContent;
}

export function HomePage({ lang, onNavigate, content }: HomePageProps) {
  const t = UI[lang];
  const [activeProduct, setActiveProduct] = useState(0);

  const products = getProducts(content);
  const services = getHomeServices(content);
  const projects = getHomeProjects(content);
  const provider = getProvider(content);
  const clients = getClients();
  const settings = getSettings(content);

  // Override hero text if dynamic content is loaded
  const heroTitle = content.hero?.title[lang] ?? t.heroTitle;
  const heroDescription = content.hero?.description[lang] ?? t.heroDescription;
  const heroCtaLabel = content.hero?.ctaLabel[lang] ?? t.learnMore;

  return (
    <>
      {/* Hero / Face section */}
      <section className="dv-face-section">
        <div className="dv-container dv-face-banner">
          <div className="dv-face-block">
            <div className="dv-face-block__title">{heroTitle}</div>
            <div className="dv-face-block__description">{heroDescription}</div>
            <a
              className="dv-button"
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
            >
              {heroCtaLabel}
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
                {products[activeProduct]?.image ? (
                  <img
                    className="key-products__image"
                    src={products[activeProduct].image}
                    alt={products[activeProduct]?.type[lang] ?? ''}
                  />
                ) : (
                  <div className="dv-key-products__placeholder">Нет изображения</div>
                )}
              </div>
              <div className="dv-key-products__list">
                {products.map((p, idx) => (
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
              {services.map((s, idx) => (
                <div key={idx} className="dv-services__item">
                  <div className="single-element__image">
                    <SafeImg src={s.image} alt={s.title[lang]} />
                  </div>
                  <div className="dv-single-element__title">{s.title[lang]}</div>
                </div>
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
            {projects.map((p, idx) => (
              <div key={idx} className="dv-project__item">
                <SafeImg className="dv-project__img" src={p.image} alt={p.title[lang]} />
                <div className="dv-project__text-area">
                  <div className="dv-project__tittle">{p.title[lang]}</div>
                  <div className="dv-project__text">{p.text[lang]}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="dv-project__file">
            <a
              className="dv-button dv-project__button"
              href={settings.referenceListUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.downloadReference}
            </a>
          </div>
        </div>
      </section>

      {/* Background wrapper: provider + crane + clients + subscribe
          all share the decorative bottom_background pattern rising from the footer */}
      <div className="dv-bottom-bg">
        {/* Provider block — text only, no crane background */}
        <section className="dv-provider-section">
          <div className="dv-container">
            <div className="dv-provider__tittle">{provider.title[lang]}</div>
            <div className="dv-provider__text">
              {provider.paragraphs[lang].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Crane + Russia map — standalone image, limited to container width */}
        <section className="dv-crane-banner-section">
          <div className="dv-crane-banner" />
        </section>

        {/* Clients */}
        <section className="dv-clients-section">
          <div className="dv-container">
            <div className="dv-clients__tittle">{t.ourClients}</div>
            <div className="dv-clients__wrapper">
              {clients.map((c, idx) => (
                <div className="dv-client" key={idx}>
                  <SafeImg src={c} alt={`Client ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <SubscribeForm lang={lang} />
      </div>
    </>
  );
}

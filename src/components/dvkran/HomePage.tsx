'use client';

import { useState } from 'react';
import {
  HERO,
  KEY_PRODUCTS,
  HOME_SERVICES,
  HOME_PROJECTS,
  PROVIDER,
  CLIENTS,
  siteConfig,
  type PageId,
} from './data';
import { SubscribeForm } from './SubscribeForm';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <>
      {/* Hero / Face section */}
      <section className="dv-face-section">
        <div className="dv-container dv-face-banner">
          <div className="dv-face-block">
            <div className="dv-face-block__title">{HERO.title}</div>
            <div className="dv-face-block__description">{HERO.description}</div>
            <a
              className="dv-button"
              href="/service"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(HERO.ctaHref);
              }}
            >
              {HERO.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Key products */}
      <section className="dv-key-products-section">
        <div className="dv-container">
          <div className="dv-key-products">
            <div className="dv-key-products__title">Продукция</div>
            <div className="dv-key-products__view">
              <div className="dv-key-products__viewer">
                <img
                  className="key-products__image"
                  src={KEY_PRODUCTS[activeProduct].image}
                  alt={KEY_PRODUCTS[activeProduct].type}
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
                      onNavigate('products');
                    }}
                    onMouseEnter={() => setActiveProduct(idx)}
                  >
                    <div className="key-products__type">{p.type}</div>
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
              Инжиниринговые услуги
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
                    <img src={s.image} alt={s.title} />
                  </div>
                  <div className="dv-single-element__title">{s.title}</div>
                  <div className="dv-button-transparent">Подробнее</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our projects preview */}
      <section className="dv-projects-section">
        <div className="dv-container">
          <div className="dv-project__header-tittle">Наши проекты</div>
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
                <img className="dv-project__img" src={p.image} alt={p.title} />
                <div className="dv-project__text-area">
                  <div className="dv-project__tittle">{p.title}</div>
                  <div className="dv-project__text">{p.text}</div>
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
              Скачать референс лист
            </a>
          </div>
        </div>
      </section>

      {/* Provider block */}
      <section className="dv-provider-section">
        <div className="dv-container">
          <div className="dv-provider__tittle">{PROVIDER.title}</div>
          <div className="dv-provider__text">
            {PROVIDER.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="dv-clients-section">
        <div className="dv-container">
          <div className="dv-clients__tittle">Наши клиенты</div>
          <div className="dv-clients__wrapper">
            {CLIENTS.map((c, idx) => (
              <div className="dv-client" key={idx}>
                <img src={c} alt={`Клиент ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
}

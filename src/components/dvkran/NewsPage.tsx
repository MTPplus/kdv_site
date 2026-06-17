'use client';

import { useState } from 'react';
import { NEWS } from './data';

export function NewsPage() {
  const [activeYear, setActiveYear] = useState<string>('all');

  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{NEWS.title}</div>

      <section className="dv-service-section">
        <div className="dv-service">
          <div className="dv-service__body">
            <div className="dv-news">
              <div className="dv-news__tags">
                {NEWS.tags.map((t) => (
                  <a
                    key={t.value}
                    className="dv-news__tag hashtag"
                    href={`/news/?nt=${t.value}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {t.label}
                  </a>
                ))}
                <a
                  className="dv-button dv-news__clear"
                  href="/news/"
                  onClick={(e) => e.preventDefault()}
                >
                  Очистить
                </a>
              </div>

              <div className="dv-news__wrapper">
                <div className="dv-news__sidebar">
                  <div className="dv-news__sidebar-column">
                    <div
                      className={`dv-news__sidebar-link${activeYear === 'all' ? ' active' : ''}`}
                    >
                      <a
                        href="/news/"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveYear('all');
                        }}
                      >
                        Все
                      </a>
                    </div>
                    {NEWS.years.map((y) => (
                      <div
                        key={y.value}
                        className={`dv-news__sidebar-link${activeYear === y.value ? ' active' : ''}`}
                      >
                        <a
                          href={`/news/?ny=${y.value}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveYear(y.value);
                          }}
                        >
                          {y.label}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dv-news__list">
                  {NEWS.items.map((item, idx) => (
                    <div className="dv-news-item" key={idx}>
                      <a
                        className="dv-news-item__image"
                        href={item.href}
                        onClick={(e) => e.preventDefault()}
                      >
                        <img src={item.image} alt={item.title} />
                      </a>
                      <div className="dv-news-item__info">
                        <div className="dv-news-item__date">{item.date}</div>
                        <div className="dv-news-item__title">
                          <a
                            href={item.href}
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.title}
                          </a>
                        </div>
                        <div className="dv-news-item__tags">
                          <a
                            className="dv-news-item__tag hashtag"
                            href={`/news/?nt=${item.tag}`}
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.tag}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

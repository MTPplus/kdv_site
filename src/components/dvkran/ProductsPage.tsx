'use client';

import { PRODUCTS, type PageId } from './data';

interface ProductsPageProps {
  onNavigate: (page: PageId) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{PRODUCTS.title}</div>
      <div className="dv-services">
        <div className="dv-services-tile">
          {PRODUCTS.items.map((item, idx) => (
            <div key={idx} className="dv-services__item single-element">
              <div className="single-element__image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="dv-single-element__title">{item.title}</div>
              <a
                href={item.href}
                className="dv-button-transparent"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Подробнее
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

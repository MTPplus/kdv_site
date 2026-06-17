'use client';

import { PROJECTS } from './data';
import { SubscribeForm } from './SubscribeForm';

export function ProjectsPage() {
  return (
    <>
      <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
        <div className="dv-page__title">{PROJECTS.title}</div>
        <div className="dv-project-filter">
          <div className="dv-project-filter__label">{PROJECTS.filterLabel}</div>
          <select
            className="dv-project-filter__select"
            name="project-filter"
            defaultValue="4"
          >
            {PROJECTS.filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="dv-button dv-project-filter__button">
            {PROJECTS.filterButton}
          </div>
        </div>

        <section className="dv-projects-section" style={{ marginBottom: 0 }}>
          <div className="dv-portfolio">
            <div className="dv-portfolio__tile">
              {PROJECTS.items.map((item, idx) => (
                <div key={idx} className="dv-portfolio__item">
                  <div className="dv-portfolio__wrapper">
                    <div className="dv-portfolio__info">
                      <div className="dv-portfolio__case">
                        <span>{item.case}</span>
                        {item.caseEn}
                      </div>
                      <div className="dv-portfolio__item-title">{item.title}</div>
                      <a
                        href="#"
                        className="dv-button-transparent dv-portfolio__button"
                        onClick={(e) => e.preventDefault()}
                      >
                        Подробнее
                      </a>
                    </div>
                    <div className="dv-portfolio__image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SubscribeForm />
    </>
  );
}

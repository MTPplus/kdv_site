'use client';

import { PROJECTS, UI, type Lang } from './data';
import { SubscribeForm } from './SubscribeForm';

interface ProjectsPageProps {
  lang: Lang;
}

export function ProjectsPage({ lang }: ProjectsPageProps) {
  const t = UI[lang];
  return (
    <>
      <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
        <div className="dv-page__title">{PROJECTS.title[lang]}</div>
        <div className="dv-project-filter">
          <div className="dv-project-filter__label">{PROJECTS.filterLabel[lang]}</div>
          <select
            className="dv-project-filter__select"
            name="project-filter"
            defaultValue="4"
          >
            {PROJECTS.filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label[lang]}
              </option>
            ))}
          </select>
          <div className="dv-button dv-project-filter__button">
            {PROJECTS.filterButton[lang]}
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
                        <span>{item.case[lang]}</span>
                        {item.caseEn}
                      </div>
                      <div className="dv-portfolio__item-title">{item.title[lang]}</div>
                      <a
                        href="#"
                        className="dv-button-transparent dv-portfolio__button"
                        onClick={(e) => e.preventDefault()}
                      >
                        {t.more}
                      </a>
                    </div>
                    <div className="dv-portfolio__image">
                      <img src={item.image} alt={item.title[lang]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SubscribeForm lang={lang} />
    </>
  );
}

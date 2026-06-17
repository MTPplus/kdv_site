'use client';

import { VACANCY } from './data';

export function VacancyPage() {
  return (
    <div className="dv-container" style={{ paddingTop: 30, paddingBottom: 80 }}>
      <div className="dv-page__title">{VACANCY.title}</div>
      <div className="dv-jobs-wrapper">
        <div className="dv-jobs-text"></div>
        <div className="dv-jobs">
          {VACANCY.jobs.map((job, idx) => (
            <a
              key={idx}
              className="dv-job"
              href={job.href}
              onClick={(e) => e.preventDefault()}
            >
              <div className="dv-job__title">{job.title}</div>
              <div className="dv-job__group">
                <div className="dv-job__label"></div>
                <div className="dv-job__value">{job.salary}</div>
              </div>
              <div className="dv-job__group">
                <div className="dv-job__label"></div>
                <div className="dv-job__value">{job.requirements}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

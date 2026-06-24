'use client';

import { useState } from 'react';
import { UI, type Lang } from './data';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}

export function SuccessModal({ open, onClose, lang }: SuccessModalProps) {
  const t = UI[lang];
  if (!open) return null;
  return (
    <div className={`dv-success-window${open ? ' open' : ''}`}>
      <div className="dv-success-window__background" onClick={onClose}></div>
      <div className="dv-success-window__panel">
        <button
          className="dv-success-window__close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="dv-success-window__title">{t.successTitle}</div>
        <div className="dv-success-window__text">{t.successText}</div>
        <button className="dv-button" onClick={onClose}>
          {t.ok}
        </button>
      </div>
    </div>
  );
}

interface SubscribeFormProps {
  lang: Lang;
  compact?: boolean;
}

export function SubscribeForm({ lang, compact = false }: SubscribeFormProps) {
  const t = UI[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending a request (as on the source site)
    setSuccess(true);
    setName('');
    setPhone('');
  };

  return (
    <>
      <section className="dv-subscribe-section" style={compact ? { marginBottom: 40 } : undefined}>
        <div className="dv-container">
          <div className="dv-subscribe">
            {/* Top: crane + Russia map image (as on original dvkran.ru) */}
            <div className="dv-subscribe__image" aria-hidden="true"></div>
            {/* Bottom: form with geometric SVG background */}
            <div className="dv-subscribe__body">
              <div className="dv-subscribe__title">{t.haveQuestions}</div>
              <form className="dv-subscribe__form" onSubmit={handleSubmit}>
                <input
                  className="dv-subscribe__name"
                  type="text"
                  name="name"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="dv-subscribe__phone"
                  type="tel"
                  name="phone"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              <input
                className="dv-button dv-subscribe__button"
                type="submit"
                value={t.submitRequest}
              />
            </form>
            <div className="dv-subscribe__note">{t.privacyNote}</div>
            </div>
          </div>
        </div>
      </section>
      <SuccessModal open={success} onClose={() => setSuccess(false)} lang={lang} />
    </>
  );
}

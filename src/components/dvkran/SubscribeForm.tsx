'use client';

import { useState } from 'react';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;
  return (
    <div className={`dv-success-window${open ? ' open' : ''}`}>
      <div className="dv-success-window__background" onClick={onClose}></div>
      <div className="dv-success-window__panel">
        <button
          className="dv-success-window__close-button"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="dv-success-window__title">Ваша заявка успешно отправлена!</div>
        <div className="dv-success-window__text">
          Наш менеджер свяжется с Вами в ближайшее время.
        </div>
        <button className="dv-button" onClick={onClose}>
          Ок
        </button>
      </div>
    </div>
  );
}

interface SubscribeFormProps {
  compact?: boolean;
}

export function SubscribeForm({ compact = false }: SubscribeFormProps) {
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
            <div className="dv-subscribe__title">Остались вопросы?</div>
            <form className="dv-subscribe__form" onSubmit={handleSubmit}>
              <input
                className="dv-subscribe__name"
                type="text"
                name="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="dv-subscribe__phone"
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                className="dv-button dv-subscribe__button"
                type="submit"
                value="Оставить заявку"
              />
            </form>
            <div className="dv-subscribe__note">
              Нажимая кнопку, вы подтверждаете, что ознакомились и согласны с политикой
              конфиденциальности
            </div>
          </div>
        </div>
      </section>
      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </>
  );
}

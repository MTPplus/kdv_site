'use client';

import { useEffect, useState } from 'react';
import type { ContentData, Bilingual } from '@/lib/content-store';

const ADMIN_TOKEN_KEY = 'dvkran-admin-token';
const DEFAULT_TOKEN = 'admin';

interface AdminPageProps {
  onExit: () => void;
}

export function AdminPage({ onExit }: AdminPageProps) {
  const [token, setToken] = useState<string>('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  // Restore token from storage on mount
  useEffect(() => {
    const saved = window.localStorage.getItem(ADMIN_TOKEN_KEY);
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  // Load content when authed
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch('/api/content', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setData(j.data);
        else setMsg({ type: 'error', text: j.error || 'Load failed' });
      })
      .catch((e) => setMsg({ type: 'error', text: String(e) }))
      .finally(() => setLoading(false));
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token === DEFAULT_TOKEN) {
      window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
      setAuthed(true);
      setMsg(null);
    } else {
      setMsg({ type: 'error', text: 'Неверный токен. По умолчанию: admin' });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthed(false);
    setToken('');
    setData(null);
  };

  const handleSave = async () => {
    if (!data) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (j.ok) {
        setMsg({ type: 'ok', text: 'Сохранено! Изменения видны на сайте.' });
      } else {
        setMsg({ type: 'error', text: j.error || 'Save failed' });
      }
    } catch (e) {
      setMsg({ type: 'error', text: String(e) });
    } finally {
      setLoading(false);
    }
  };

  const openPreview = () => {
    window.open('/', '_blank');
  };

  // ---------- Login screen ----------
  if (!authed) {
    return (
      <div className="dv-admin-login">
        <div className="dv-admin-login__panel">
          <h1 className="dv-admin-login__title">КРАН-ДВ — Admin</h1>
          <p className="dv-admin-login__hint">
            Введите токен администратора для входа в панель управления контентом.
          </p>
          <form onSubmit={handleLogin} className="dv-admin-login__form">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin token"
              className="dv-admin-input"
              autoFocus
            />
            <button type="submit" className="dv-button">
              Войти
            </button>
          </form>
          {msg && <div className="dv-admin-msg dv-admin-msg--error">{msg.text}</div>}
          <div className="dv-admin-login__footer">
            <button onClick={onExit} className="dv-admin-link">
              ← Вернуться на сайт
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Loading ----------
  if (!data) {
    return (
      <div className="dv-admin-loading">
        <p>Загрузка контента...</p>
      </div>
    );
  }

  // ---------- Editor ----------
  const update = (mutator: (d: ContentData) => void) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev)) as ContentData;
      mutator(next);
      return next;
    });
  };

  return (
    <div className="dv-admin">
      <header className="dv-admin__topbar">
        <div className="dv-admin__topbar-title">КРАН-ДВ — Content Admin</div>
        <div className="dv-admin__topbar-actions">
          <button onClick={openPreview} className="dv-admin-btn dv-admin-btn--ghost">
            Открыть предпросмотр ↗
          </button>
          <button
            onClick={handleSave}
            className="dv-admin-btn dv-admin-btn--primary"
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button onClick={handleLogout} className="dv-admin-btn dv-admin-btn--ghost">
            Выйти
          </button>
          <button onClick={onExit} className="dv-admin-btn dv-admin-btn--ghost">
            ← На сайт
          </button>
        </div>
      </header>

      {msg && (
        <div
          className={`dv-admin-msg ${
            msg.type === 'ok' ? 'dv-admin-msg--ok' : 'dv-admin-msg--error'
          }`}
        >
          {msg.text}
        </div>
      )}

      <main className="dv-admin__main">
        {/* Settings */}
        <AdminCard title="Настройки сайта (телефоны, email, адреса)">
          <Field label="Телефон (основной)">
            <input
              className="dv-admin-input"
              value={data.settings.phone}
              onChange={(e) => update((d) => { d.settings.phone = e.target.value; })}
            />
          </Field>
          <Field label="Телефон (дополнительный)">
            <input
              className="dv-admin-input"
              value={data.settings.phoneAdditional}
              onChange={(e) => update((d) => { d.settings.phoneAdditional = e.target.value; })}
            />
          </Field>
          <Field label="Email (футер)">
            <input
              className="dv-admin-input"
              value={data.settings.email}
              onChange={(e) => update((d) => { d.settings.email = e.target.value; })}
            />
          </Field>
          <Field label="Email (офис / contacts)">
            <input
              className="dv-admin-input"
              value={data.settings.emailOffice}
              onChange={(e) => update((d) => { d.settings.emailOffice = e.target.value; })}
            />
          </Field>
          <BilingualField
            label="Адрес (футер)"
            value={data.settings.addressFooter}
            onChange={(v) => update((d) => { d.settings.addressFooter = v; })}
          />
          <BilingualField
            label="Адрес (офис / contacts)"
            value={data.settings.addressOffice}
            onChange={(v) => update((d) => { d.settings.addressOffice = v; })}
          />
          <BilingualField
            label="Copyright"
            value={data.settings.copyright}
            onChange={(v) => update((d) => { d.settings.copyright = v; })}
          />
          <Field label="URL референс-листа">
            <input
              className="dv-admin-input"
              value={data.settings.referenceListUrl}
              onChange={(e) => update((d) => { d.settings.referenceListUrl = e.target.value; })}
            />
          </Field>
          <Field label="URL Яндекс.Карты">
            <input
              className="dv-admin-input"
              value={data.settings.yandexMapSrc}
              onChange={(e) => update((d) => { d.settings.yandexMapSrc = e.target.value; })}
            />
          </Field>
        </AdminCard>

        {/* Hero */}
        <AdminCard title="Hero (баннер на главной)">
          <BilingualField
            label="Заголовок"
            value={data.hero.title}
            onChange={(v) => update((d) => { d.hero.title = v; })}
          />
          <BilingualField
            label="Описание"
            value={data.hero.description}
            textarea
            onChange={(v) => update((d) => { d.hero.description = v; })}
          />
          <BilingualField
            label="Текст кнопки"
            value={data.hero.ctaLabel}
            onChange={(v) => update((d) => { d.hero.ctaLabel = v; })}
          />
        </AdminCard>

        {/* Products */}
        <AdminCard title={`Продукция (${data.products.length})`}>
          {data.products.map((p, i) => (
            <ItemRow key={i} index={i} onRemove={() => update((d) => { d.products.splice(i, 1); })}>
              <BilingualField
                label="Название"
                value={p.type}
                onChange={(v) => update((d) => { d.products[i].type = v; })}
              />
              <Field label="Путь к картинке">
                <input
                  className="dv-admin-input"
                  value={p.image}
                  onChange={(e) => update((d) => { d.products[i].image = e.target.value; })}
                />
              </Field>
            </ItemRow>
          ))}
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={() => update((d) => {
              d.products.push({ type: { ru: '', en: '' }, image: '' });
            })}
          >
            + Добавить продукт
          </button>
        </AdminCard>

        {/* Home services */}
        <AdminCard title={`Услуги на главной (${data.homeServices.length})`}>
          {data.homeServices.map((s, i) => (
            <ItemRow key={i} index={i} onRemove={() => update((d) => { d.homeServices.splice(i, 1); })}>
              <BilingualField
                label="Название"
                value={s.title}
                onChange={(v) => update((d) => { d.homeServices[i].title = v; })}
              />
              <Field label="Путь к картинке">
                <input
                  className="dv-admin-input"
                  value={s.image}
                  onChange={(e) => update((d) => { d.homeServices[i].image = e.target.value; })}
                />
              </Field>
            </ItemRow>
          ))}
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={() => update((d) => {
              d.homeServices.push({ title: { ru: '', en: '' }, image: '' });
            })}
          >
            + Добавить услугу
          </button>
        </AdminCard>

        {/* Home projects */}
        <AdminCard title={`Проекты на главной (${data.homeProjects.length})`}>
          {data.homeProjects.map((p, i) => (
            <ItemRow key={i} index={i} onRemove={() => update((d) => { d.homeProjects.splice(i, 1); })}>
              <BilingualField
                label="Заголовок"
                value={p.title}
                onChange={(v) => update((d) => { d.homeProjects[i].title = v; })}
              />
              <BilingualField
                label="Описание"
                value={p.text}
                textarea
                onChange={(v) => update((d) => { d.homeProjects[i].text = v; })}
              />
              <Field label="Путь к картинке">
                <input
                  className="dv-admin-input"
                  value={p.image}
                  onChange={(e) => update((d) => { d.homeProjects[i].image = e.target.value; })}
                />
              </Field>
            </ItemRow>
          ))}
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={() => update((d) => {
              d.homeProjects.push({ title: { ru: '', en: '' }, text: { ru: '', en: '' }, image: '' });
            })}
          >
            + Добавить проект
          </button>
        </AdminCard>

        {/* Provider */}
        <AdminCard title="Блок «Ответственный поставщик»">
          <BilingualField
            label="Заголовок"
            value={data.provider.title}
            onChange={(v) => update((d) => { d.provider.title = v; })}
          />
          <BilingualListField
            label="Параграфы (один абзац — одно поле)"
            value={data.provider.paragraphs}
            onChange={(v) => update((d) => { d.provider.paragraphs = v; })}
            textarea
          />
        </AdminCard>

        {/* About */}
        <AdminCard title="Страница «О компании»">
          <BilingualField
            label="Заголовок страницы"
            value={data.about.title}
            onChange={(v) => update((d) => { d.about.title = v; })}
          />
          <BilingualListField
            label="Параграфы основного текста"
            value={{
              ru: data.about.text.ru,
              en: data.about.text.en,
            }}
            onChange={(v) => update((d) => { d.about.text = v; })}
            textarea
          />
          <BilingualField
            label="Подпись директора"
            value={data.about.signature}
            textarea
            onChange={(v) => update((d) => { d.about.signature = v; })}
          />
          <BilingualField
            label="Заголовок секции индустрий"
            value={data.about.industryTitle}
            onChange={(v) => update((d) => { d.about.industryTitle = v; })}
          />
          <BilingualListField
            label="Список индустрий (одна на строку)"
            value={{
              ru: data.about.industries.ru,
              en: data.about.industries.en,
            }}
            onChange={(v) => update((d) => { d.about.industries = v; })}
          />
          <BilingualField
            label="Заголовок «MICROTERM PLUS сегодня»"
            value={data.about.mtTodayTitle}
            onChange={(v) => update((d) => { d.about.mtTodayTitle = v; })}
          />
          <BilingualListField
            label="Плитки «MICROTERM PLUS сегодня» (одна на строку)"
            value={{
              ru: data.about.mtTodayTiles.map((t) => t.text.ru),
              en: data.about.mtTodayTiles.map((t) => t.text.en),
            }}
            onChange={(v) => update((d) => {
              d.about.mtTodayTiles = v.ru.map((text, i) => ({
                text: { ru: text, en: v.en[i] || '' },
                icon: `/images/dvkran/dev__res${i + 1}.svg`,
              }));
            })}
          />
          <BilingualField
            label="Заголовок секции сертификатов"
            value={data.about.certsTitle}
            onChange={(v) => update((d) => { d.about.certsTitle = v; })}
          />
        </AdminCard>

        {/* Service items (services page) */}
        <AdminCard title={`Услуги (страница) (${data.serviceItems.length})`}>
          {data.serviceItems.map((s, i) => (
            <ItemRow key={i} index={i} onRemove={() => update((d) => { d.serviceItems.splice(i, 1); })}>
              <BilingualField
                label="Название"
                value={s.title}
                onChange={(v) => update((d) => { d.serviceItems[i].title = v; })}
              />
              <Field label="Путь к картинке">
                <input
                  className="dv-admin-input"
                  value={s.image}
                  onChange={(e) => update((d) => { d.serviceItems[i].image = e.target.value; })}
                />
              </Field>
            </ItemRow>
          ))}
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={() => update((d) => {
              d.serviceItems.push({ title: { ru: '', en: '' }, image: '' });
            })}
          >
            + Добавить услугу
          </button>
        </AdminCard>

        {/* Project items (projects page) */}
        <AdminCard title={`Проекты (страница) (${data.projectItems.length})`}>
          {data.projectItems.map((p, i) => (
            <ItemRow key={i} index={i} onRemove={() => update((d) => { d.projectItems.splice(i, 1); })}>
              <BilingualField
                label="Категория"
                value={p.case}
                onChange={(v) => update((d) => { d.projectItems[i].case = v; })}
              />
              <Field label="Английская подпись категории (Case En)">
                <input
                  className="dv-admin-input"
                  value={p.caseEn}
                  onChange={(e) => update((d) => { d.projectItems[i].caseEn = e.target.value; })}
                />
              </Field>
              <BilingualField
                label="Заголовок проекта"
                value={p.title}
                textarea
                onChange={(v) => update((d) => { d.projectItems[i].title = v; })}
              />
              <Field label="Путь к картинке">
                <input
                  className="dv-admin-input"
                  value={p.image}
                  onChange={(e) => update((d) => { d.projectItems[i].image = e.target.value; })}
                />
              </Field>
            </ItemRow>
          ))}
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={() => update((d) => {
              d.projectItems.push({
                case: { ru: '', en: '' },
                caseEn: '',
                title: { ru: '', en: '' },
                image: '',
              });
            })}
          >
            + Добавить проект
          </button>
        </AdminCard>
      </main>

      <footer className="dv-admin__footer">
        <button
          onClick={openPreview}
          className="dv-admin-btn dv-admin-btn--primary"
        >
          Открыть предпросмотр в новой вкладке ↗
        </button>
        <button
          onClick={handleSave}
          className="dv-admin-btn dv-admin-btn--primary"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </footer>
    </div>
  );
}

// ---------- Small UI helpers ----------

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="dv-admin-card">
      <h2 className="dv-admin-card__title">{title}</h2>
      <div className="dv-admin-card__body">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="dv-admin-field">
      <span className="dv-admin-field__label">{label}</span>
      {children}
    </label>
  );
}

function BilingualField({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: Bilingual;
  onChange: (v: Bilingual) => void;
  textarea?: boolean;
}) {
  return (
    <div className="dv-admin-field">
      <span className="dv-admin-field__label">{label}</span>
      <div className="dv-admin-bilingual">
        <label className="dv-admin-bilingual__col">
          <span className="dv-admin-bilingual__tag">RU</span>
          {textarea ? (
            <textarea
              className="dv-admin-input"
              rows={3}
              value={value.ru}
              onChange={(e) => onChange({ ...value, ru: e.target.value })}
            />
          ) : (
            <input
              className="dv-admin-input"
              value={value.ru}
              onChange={(e) => onChange({ ...value, ru: e.target.value })}
            />
          )}
        </label>
        <label className="dv-admin-bilingual__col">
          <span className="dv-admin-bilingual__tag">EN</span>
          {textarea ? (
            <textarea
              className="dv-admin-input"
              rows={3}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          ) : (
            <input
              className="dv-admin-input"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
            />
          )}
        </label>
      </div>
    </div>
  );
}

function BilingualListField({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: { ru: string[]; en: string[] };
  onChange: (v: { ru: string[]; en: string[] }) => void;
  textarea?: boolean;
}) {
  return (
    <div className="dv-admin-field">
      <span className="dv-admin-field__label">{label}</span>
      <div className="dv-admin-bilingual">
        <label className="dv-admin-bilingual__col">
          <span className="dv-admin-bilingual__tag">RU</span>
          {textarea ? (
            <textarea
              className="dv-admin-input"
              rows={Math.max(3, value.ru.length)}
              value={value.ru.join('\n')}
              onChange={(e) => onChange({ ...value, ru: e.target.value.split('\n') })}
            />
          ) : (
            <textarea
              className="dv-admin-input"
              rows={Math.max(3, value.ru.length)}
              value={value.ru.join('\n')}
              onChange={(e) => onChange({ ...value, ru: e.target.value.split('\n') })}
            />
          )}
        </label>
        <label className="dv-admin-bilingual__col">
          <span className="dv-admin-bilingual__tag">EN</span>
          <textarea
            className="dv-admin-input"
            rows={Math.max(3, value.en.length)}
            value={value.en.join('\n')}
            onChange={(e) => onChange({ ...value, en: e.target.value.split('\n') })}
          />
        </label>
      </div>
      <div className="dv-admin-field__hint">Каждая строка = отдельный элемент</div>
    </div>
  );
}

function ItemRow({
  index,
  onRemove,
  children,
}: {
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="dv-admin-item">
      <div className="dv-admin-item__header">
        <span className="dv-admin-item__num">#{index + 1}</span>
        <button onClick={onRemove} className="dv-admin-btn dv-admin-btn--danger">
          Удалить
        </button>
      </div>
      {children}
    </div>
  );
}

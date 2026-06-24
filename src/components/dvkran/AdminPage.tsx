'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContentData, Bilingual } from '@/lib/content-store';
import { MediaPicker } from './MediaPicker';

const ADMIN_TOKEN_KEY = 'dvkran-admin-token';
const DEFAULT_TOKEN = 'admin';

interface AdminPageProps {
  onExit: () => void;
}

interface MediaPickerTarget {
  field: string; // unique key like "products.3.image"
  value: string;
}

export function AdminPage({ onExit }: AdminPageProps) {
  const [token, setToken] = useState<string>('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<MediaPickerTarget | null>(null);

  // Stable IDs for ordered lists (so React doesn't remount inputs on add/remove)
  const idMapRef = useRef<Record<string, string[]>>({});
  const nextIdRef = useRef(0);

  const makeId = () => {
    nextIdRef.current += 1;
    return `item-${nextIdRef.current}-${Date.now()}`;
  };

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
        if (j.ok) {
          setData(j.data);
          // Initialize stable IDs for each list
          const init = (arr: unknown[]) => arr.map(() => makeId());
          idMapRef.current = {
            products: init(j.data.products),
            homeServices: init(j.data.homeServices),
            homeProjects: init(j.data.homeProjects),
            serviceItems: init(j.data.serviceItems),
            projectItems: init(j.data.projectItems),
          };
        } else {
          setMsg({ type: 'error', text: j.error || 'Load failed' });
        }
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

  // Open media picker for a specific target
  const openMediaPicker = (field: string, currentValue: string) => {
    setMediaPickerTarget({ field, value: currentValue });
  };

  // Apply selected media URL to the target field
  const applyMedia = (url: string) => {
    if (!mediaPickerTarget) return;
    const field = mediaPickerTarget.field;
    update((d) => {
      const parts = field.split('.');
      const listKey = parts[0];
      const idx = parseInt(parts[1], 10);
      const prop = parts[2];
      const list = (d as any)[listKey];
      if (Array.isArray(list) && list[idx]) {
        list[idx][prop] = url;
      }
    });
    setMsg({ type: 'ok', text: `Изображение выбрано: ${url}` });
    setTimeout(() => setMsg(null), 3000);
  };

  // ---------- List helpers with stable IDs ----------
  const addToList = (listKey: 'products' | 'homeServices' | 'homeProjects' | 'serviceItems' | 'projectItems') => {
    const id = makeId();
    idMapRef.current[listKey] = [...(idMapRef.current[listKey] || []), id];
    update((d) => {
      const list = (d as any)[listKey] as any[];
      if (listKey === 'products') {
        list.push({ type: { ru: '', en: '' }, image: '' });
      } else if (listKey === 'homeServices') {
        list.push({ title: { ru: '', en: '' }, image: '' });
      } else if (listKey === 'homeProjects') {
        list.push({ title: { ru: '', en: '' }, text: { ru: '', en: '' }, image: '' });
      } else if (listKey === 'serviceItems') {
        list.push({ title: { ru: '', en: '' }, image: '' });
      } else if (listKey === 'projectItems') {
        list.push({
          case: { ru: '', en: '' },
          caseEn: '',
          title: { ru: '', en: '' },
          image: '',
        });
      }
    });
    // Auto-scroll to the new item shortly after render
    setTimeout(() => {
      const el = document.querySelector(`[data-item-id="${id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const removeFromList = (listKey: 'products' | 'homeServices' | 'homeProjects' | 'serviceItems' | 'projectItems', idx: number) => {
    idMapRef.current[listKey] = (idMapRef.current[listKey] || []).filter((_, i) => i !== idx);
    update((d) => {
      const list = (d as any)[listKey] as any[];
      list.splice(idx, 1);
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
          {data.products.map((p, i) => {
            const id = idMapRef.current.products?.[i] || `legacy-${i}`;
            return (
              <ItemRow
                key={id}
                dataItemId={id}
                index={i}
                onRemove={() => removeFromList('products', i)}
              >
                <BilingualField
                  label="Название"
                  value={p.type}
                  onChange={(v) => update((d) => { d.products[i].type = v; })}
                />
                <ImageField
                  label="Изображение"
                  value={p.image}
                  onChange={(v) => update((d) => { d.products[i].image = v; })}
                  onPick={() => openMediaPicker(`products.${i}.image`, p.image)}
                />
              </ItemRow>
            );
          })}
          <button
            className="dv-admin-btn dv-admin-btn--ghost dv-admin-btn--add"
            onClick={() => addToList('products')}
          >
            + Добавить продукт
          </button>
        </AdminCard>

        {/* Home services */}
        <AdminCard title={`Услуги на главной (${data.homeServices.length})`}>
          {data.homeServices.map((s, i) => {
            const id = idMapRef.current.homeServices?.[i] || `legacy-${i}`;
            return (
              <ItemRow
                key={id}
                dataItemId={id}
                index={i}
                onRemove={() => removeFromList('homeServices', i)}
              >
                <BilingualField
                  label="Название"
                  value={s.title}
                  onChange={(v) => update((d) => { d.homeServices[i].title = v; })}
                />
                <ImageField
                  label="Изображение"
                  value={s.image}
                  onChange={(v) => update((d) => { d.homeServices[i].image = v; })}
                  onPick={() => openMediaPicker(`homeServices.${i}.image`, s.image)}
                />
              </ItemRow>
            );
          })}
          <button
            className="dv-admin-btn dv-admin-btn--ghost dv-admin-btn--add"
            onClick={() => addToList('homeServices')}
          >
            + Добавить услугу
          </button>
        </AdminCard>

        {/* Home projects */}
        <AdminCard title={`Проекты на главной (${data.homeProjects.length})`}>
          {data.homeProjects.map((p, i) => {
            const id = idMapRef.current.homeProjects?.[i] || `legacy-${i}`;
            return (
              <ItemRow
                key={id}
                dataItemId={id}
                index={i}
                onRemove={() => removeFromList('homeProjects', i)}
              >
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
                <ImageField
                  label="Изображение"
                  value={p.image}
                  onChange={(v) => update((d) => { d.homeProjects[i].image = v; })}
                  onPick={() => openMediaPicker(`homeProjects.${i}.image`, p.image)}
                />
              </ItemRow>
            );
          })}
          <button
            className="dv-admin-btn dv-admin-btn--ghost dv-admin-btn--add"
            onClick={() => addToList('homeProjects')}
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
      </main>

      <footer className="dv-admin__footer">
        <button onClick={openPreview} className="dv-admin-btn dv-admin-btn--primary">
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

      {/* Media picker modal */}
      <MediaPicker
        open={mediaPickerTarget !== null}
        onClose={() => setMediaPickerTarget(null)}
        onSelect={applyMedia}
        adminToken={token}
      />
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
          <textarea
            className="dv-admin-input"
            rows={Math.max(3, value.ru.length)}
            value={value.ru.join('\n')}
            onChange={(e) => onChange({ ...value, ru: e.target.value.split('\n') })}
          />
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

function ImageField({
  label,
  value,
  onChange,
  onPick,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onPick: () => void;
}) {
  return (
    <div className="dv-admin-field">
      <span className="dv-admin-field__label">{label}</span>
      <div className="dv-admin-image-field">
        <div className="dv-admin-image-field__preview">
          {value ? (
            <img src={value} alt="" />
          ) : (
            <div className="dv-admin-image-field__empty">Нет изображения</div>
          )}
        </div>
        <div className="dv-admin-image-field__controls">
          <input
            className="dv-admin-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/dvkran/... или /uploads/..."
          />
          <button
            type="button"
            className="dv-admin-btn dv-admin-btn--primary"
            onClick={onPick}
          >
            📁 Выбрать файл
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemRow({
  index,
  onRemove,
  children,
  dataItemId,
}: {
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
  dataItemId?: string;
}) {
  return (
    <div className="dv-admin-item" data-item-id={dataItemId}>
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

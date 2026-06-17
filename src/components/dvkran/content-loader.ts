/**
 * Loads site content from the admin API (/api/content) with a fallback
 * to the bundled static data (data.ts). Used by all pages so the site keeps
 * working even if the admin JSON is unavailable.
 */
import {
  KEY_PRODUCTS,
  HOME_SERVICES,
  HOME_PROJECTS,
  PROVIDER,
  ABOUT,
  SERVICES,
  PROJECTS,
  CONTACTS,
  CLIENTS,
  siteConfig,
  type Lang,
} from './data';

export interface DynamicContent {
  loaded: boolean;
  settings?: {
    phone: string;
    phoneAdditional: string;
    email: string;
    emailOffice: string;
    addressFooter: { ru: string; en: string };
    addressOffice: { ru: string; en: string };
    copyright: { ru: string; en: string };
    referenceListUrl: string;
    yandexMapSrc: string;
  };
  hero?: {
    title: { ru: string; en: string };
    description: { ru: string; en: string };
    ctaLabel: { ru: string; en: string };
  };
  products?: Array<{ type: { ru: string; en: string }; image: string }>;
  homeServices?: Array<{ title: { ru: string; en: string }; image: string }>;
  homeProjects?: Array<{
    title: { ru: string; en: string };
    text: { ru: string; en: string };
    image: string;
  }>;
  provider?: {
    title: { ru: string; en: string };
    paragraphs: { ru: string[]; en: string[] };
  };
  about?: typeof ABOUT;
  serviceItems?: Array<{ title: { ru: string; en: string }; image: string }>;
  projectItems?: Array<{
    case: { ru: string; en: string };
    caseEn: string;
    title: { ru: string; en: string };
    image: string;
  }>;
}

let cached: DynamicContent | null = null;
let cacheExpiry = 0;

export async function loadContent(): Promise<DynamicContent> {
  const now = Date.now();
  if (cached && now < cacheExpiry) {
    return cached;
  }

  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Unknown error');
    cached = { loaded: true, ...json.data };
    cacheExpiry = now + 30_000;
  } catch {
    cached = { loaded: false };
    cacheExpiry = now + 5_000;
  }
  return cached;
}

// Convenience getters with fallback to static data
export function getProducts(c: DynamicContent) {
  return c.products ?? KEY_PRODUCTS;
}
export function getHomeServices(c: DynamicContent) {
  return c.homeServices ?? HOME_SERVICES;
}
export function getHomeProjects(c: DynamicContent) {
  return c.homeProjects ?? HOME_PROJECTS;
}
export function getProvider(c: DynamicContent) {
  return c.provider ?? PROVIDER;
}
export function getAbout(c: DynamicContent) {
  return c.about ?? ABOUT;
}
export function getServiceItems(c: DynamicContent) {
  return c.serviceItems ?? SERVICES.items.map((i) => ({ title: i.title, image: i.image }));
}
export function getProjectItems(c: DynamicContent) {
  return c.projectItems ?? PROJECTS.items.map((i) => ({
    case: i.case,
    caseEn: i.caseEn,
    title: i.title,
    image: i.image,
  }));
}
export function getSettings(c: DynamicContent) {
  if (!c.settings) {
    return {
      phone: '7 4212 54-41-95',
      phoneAdditional: '+7-924-108-58-70',
      email: 'kran-dv@microtermplus.ru',
      emailOffice: 'office@microtermplus.ru',
      addressFooter: {
        ru: '680001, г. Хабаровск, ул. Монтажная, 30, строение А, офис 21',
        en: '680001, Khabarovsk, Montazhnaya st., 30, building A, office 21',
      },
      addressOffice: {
        ru: '680012 г. Хабаровск, ул. Флегонтова, 27',
        en: '680012 Khabarovsk, Flegontova st., 27',
      },
      copyright: { ru: '2023 @ Все права защищены.', en: '2023 @ All rights reserved.' },
      referenceListUrl: siteConfig.referenceListUrl,
      yandexMapSrc: siteConfig.yandexMapSrc,
    };
  }
  return c.settings;
}

export function getClients() {
  return CLIENTS;
}

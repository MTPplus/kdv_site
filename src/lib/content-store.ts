/**
 * Server-side content store.
 * Content lives in /home/z/my-project/data/content.json (created from defaults on first read).
 * All admin edits are persisted here and picked up by the Next.js frontend.
 */
import { promises as fs } from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

export interface Bilingual {
  ru: string;
  en: string;
}

export interface ContentData {
  settings: {
    phone: string;
    phoneAdditional: string;
    email: string;
    emailOffice: string;
    addressFooter: Bilingual;
    addressOffice: Bilingual;
    addressProduction: Bilingual;
    copyright: Bilingual;
    referenceListUrl: string;
    yandexMapSrc: string;
  };
  hero: {
    title: Bilingual;
    description: Bilingual;
    ctaLabel: Bilingual;
  };
  products: Array<{ type: Bilingual; image: string }>;
  homeServices: Array<{ title: Bilingual; image: string }>;
  homeProjects: Array<{ title: Bilingual; text: Bilingual; image: string }>;
  provider: {
    title: Bilingual;
    paragraphs: { ru: string[]; en: string[] };
  };
  about: {
    title: Bilingual;
    text: { ru: string[]; en: string[] };
    signature: Bilingual;
    industryTitle: Bilingual;
    industries: { ru: string[]; en: string[] };
    mtTodayTitle: Bilingual;
    mtTodayTiles: Array<{ text: Bilingual; icon: string }>;
    certsTitle: Bilingual;
    geographyMapAlt: Bilingual;
    certificates: string[];
  };
  serviceItems: Array<{ title: Bilingual; image: string }>;
  projectItems: Array<{
    case: Bilingual;
    caseEn: string;
    title: Bilingual;
    image: string;
  }>;
}

const DEFAULT_CONTENT: ContentData = {
  settings: {
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
    addressProduction: {
      ru: '680031, г. Хабаровск, ул. Промышленная, 15',
      en: '680031, Khabarovsk, Promyshlennaya st., 15',
    },
    copyright: {
      ru: '2023 @ Все права защищены.',
      en: '2023 @ All rights reserved.',
    },
    referenceListUrl: 'https://drive.google.com/file/d/1HalIDIAwc5oqhoHxim3A78mnr8v51ahx/view',
    yandexMapSrc: 'https://yandex.ru/map-widget/v1/?um=constructor%3Aa5577eaa4f3e4b688a0146ae51309a8d1cba1d6d711c23dc71bdca3efcdc0854&source=constructor',
  },
  hero: {
    title: {
      ru: 'Производство грузоподъемных кранов',
      en: 'Manufacturing of lifting cranes',
    },
    description: {
      ru: 'Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
      en: 'KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity.',
    },
    ctaLabel: { ru: 'Узнать подробнее', en: 'Learn more' },
  },
  products: [
    { type: { ru: 'Краны козловые', en: 'Gantry cranes' }, image: '/images/dvkran/2023__09__product-1.png' },
    { type: { ru: 'Краны мостовые', en: 'Bridge cranes' }, image: '/images/dvkran/2023__09__product-2.png' },
    { type: { ru: 'Кран-балки', en: 'Jib cranes' }, image: '/images/dvkran/2023__09__product-3.png' },
    { type: { ru: 'Крановые кабины', en: 'Crane cabins' }, image: '/images/dvkran/2023__09__product-4.png' },
    { type: { ru: 'Кресло-пульты', en: 'Chair-consoles' }, image: '/images/dvkran/2023__09__product-5.png' },
    { type: { ru: 'Аппаратные помещения', en: 'Control rooms' }, image: '/images/dvkran/2023__09__product-6.png' },
    { type: { ru: 'Аппаратные помещения', en: 'Control rooms' }, image: '/images/dvkran/2023__09__product-7.png' },
    { type: { ru: 'Вспомогательное оборудование', en: 'Auxiliary equipment' }, image: '/images/dvkran/2023__09__product-8.png' },
  ],
  homeServices: [
    { title: { ru: 'Проектирование подъёмно-транспортного оборудования', en: 'Design of lifting and transport equipment' }, image: '/images/dvkran/2023__09__service-1.png' },
    { title: { ru: 'Техническое обслуживание', en: 'Maintenance' }, image: '/images/dvkran/2023__09__service-2.png' },
    { title: { ru: 'Модернизация кранов', en: 'Crane modernization' }, image: '/images/dvkran/2023__09__service-3.png' },
    { title: { ru: 'Монтаж', en: 'Installation' }, image: '/images/dvkran/2023__09__service-4.png' },
    { title: { ru: 'Доставка', en: 'Delivery' }, image: '/images/dvkran/2023__09__service-5.png' },
    { title: { ru: 'Лизинг', en: 'Leasing' }, image: '/images/dvkran/2023__09__service-6.png' },
  ],
  homeProjects: [
    {
      title: { ru: 'Кран козловой (10 тонн) для Меркурий ДВ', en: 'Gantry crane (10 tons) for Mercury DV' },
      text: {
        ru: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
        en: 'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
      },
      image: '/images/dvkran/2023__09__product-1.png',
    },
    {
      title: { ru: 'Кран козловой (16 тонн + 16 тонн) для Корфовского каменного карьера', en: 'Gantry crane (16 tons + 16 tons) for Korf stone quarry' },
      text: {
        ru: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
        en: 'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
      },
      image: '/images/dvkran/2023__09__product-3.png',
    },
    {
      title: { ru: 'Кран козловой (10 тонн) для АО «БЭТ»', en: 'Gantry crane (10 tons) for BET JSC' },
      text: {
        ru: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
        en: 'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
      },
      image: '/images/dvkran/2023__09__product-2.png',
    },
    {
      title: { ru: 'Кран мостовой (16 тонн) для «Хабаровск Автомост»', en: 'Bridge crane (16 tons) for Khabarovsk Avtomost' },
      text: {
        ru: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
        en: 'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
      },
      image: '/images/dvkran/2023__09__product-4.png',
    },
  ],
  provider: {
    title: { ru: 'Ответственный поставщик', en: 'Responsible supplier' },
    paragraphs: {
      ru: [
        'На территории регионов Дальнего Востока.',
        'Компания «КРАН-ДВ» находится в Хабаровске. Это обеспечивает оперативную коммуникацию и логистику с Заказчиком со всего ДФО.',
        'Если вы заинтересованы в нашей продукции, отправляйте завки на нашу электронную почту и получите быстрый ответ.',
      ],
      en: [
        'In the regions of the Far East.',
        'KRAN-DV is located in Khabarovsk. This provides prompt communication and logistics with customers across the entire Far Eastern Federal District.',
        'If you are interested in our products, send requests to our e-mail and get a quick response.',
      ],
    },
  },
  about: {
    title: { ru: 'О компании', en: 'About the company' },
    text: {
      ru: [
        'Инжиниринговая компания полного цикла «Микротерм Плюс» успешно специализируется на проектировании и технической разработке в области промышленной автоматизации с 2002 года. За прошедшие годы, мы достигли больших успехов, реализовали множество масштабных проектов, получили ценный опыт и наработали тесные партнерские отношения со многими российскими и иностранными компаниями. Но мы не останавливаемся на достигнутом! Мы растем, становимся продуктивнее и продолжаем аккумулировать экспертный опыт, чтобы передавать его нашим заказчикам. Наша цель стать еще более эффективной компанией, для реализации новых амбициозных задач, придерживаясь высочайших стандартов качества.',
        'Основа успеха нашей компании — это сплоченная команда. Профессионалы, нацеленные на высокий результат, которые любят свою профессию, постоянно развиваются и изучают новые технологии. Из заслуг каждого состоит наш общий успех.',
        'Новая санкционная реальность создает целый ряд ограничений. Перед российскими производителями встал вопрос о выборе стратегии дальнейшего развития. Значительная часть устоявшихся подходов в инжиниринге требует пересмотра привычных решений. Имея многолетний практический опыт, мы готовы поддержать своих заказчиков в вопросах импортонезависимости в эксплуатации иностранного оборудования и систем, а также их дальнейшей модернизации.',
      ],
      en: [
        "Microterm Plus, a full-cycle engineering company, has been successfully specializing in design and technical development in the field of industrial automation since 2002. Over the years, we have achieved great success, implemented many large-scale projects, gained valuable experience and built close partnerships with many Russian and foreign companies. But we do not rest on our laurels! We grow, become more productive and continue to accumulate expert experience to pass it on to our customers. Our goal is to become an even more efficient company for implementing new ambitious tasks while adhering to the highest quality standards.",
        "The foundation of our company's success is a cohesive team. Professionals focused on high results who love their profession, constantly develop and study new technologies. Our common success consists of the merits of each.",
        'The new sanctions reality creates a number of restrictions. Russian manufacturers are faced with the question of choosing a strategy for further development. A significant part of the established approaches in engineering requires a revision of habitual solutions. With many years of practical experience, we are ready to support our customers in matters of import independence in the operation of foreign equipment and systems, as well as their further modernization.',
      ],
    },
    signature: {
      ru: 'Генеральный директор ООО «Микротерм Плюс»\nАтясов Олег Валерьевич',
      en: 'General Director of Microterm Plus LLC\nAtyasov Oleg Valerievich',
    },
    industryTitle: {
      ru: 'Индустрии и география реализованных проектов',
      en: 'Industries and geography of completed projects',
    },
    industries: {
      ru: [
        'Промышленность строительных материалов',
        'Лесообрабатывающая промышленность',
        'Производство подъемно-транспортного оборудования',
        'Машиностроение и металлообработка',
        'Горнодобывающая промышленность',
        'Нефтехимическая промышленность',
        'Транспортные узлы и терминалы',
        'Угольная промышленность',
        'Пищевая промышленность',
        'Легкая промышленность',
        'Электроэнергетика',
      ],
      en: [
        'Construction materials industry',
        'Woodworking industry',
        'Lifting and transport equipment manufacturing',
        'Mechanical engineering and metalworking',
        'Mining industry',
        'Petrochemical industry',
        'Transport hubs and terminals',
        'Coal industry',
        'Food industry',
        'Light industry',
        'Electric power industry',
      ],
    },
    mtTodayTitle: { ru: 'МИКРОТЕРМ ПЛЮС сегодня', en: 'MICROTERM PLUS today' },
    mtTodayTiles: [
      { text: { ru: '20 лет на рынке автоматизации', en: '20 years on the automation market' }, icon: '/images/dvkran/dev__res1.svg' },
      { text: { ru: 'Более 200 реализованных проектов', en: 'More than 200 completed projects' }, icon: '/images/dvkran/dev__res2.svg' },
      { text: { ru: 'География проектов охватывает всю Россию', en: 'Project geography covers all of Russia' }, icon: '/images/dvkran/dev__res3.svg' },
      { text: { ru: 'Точное соблюдение сроков производства работ', en: 'Strict adherence to work schedules' }, icon: '/images/dvkran/dev__res4.svg' },
      { text: { ru: 'Открытый диалог с заказчиком', en: 'Open dialogue with the customer' }, icon: '/images/dvkran/dev__res5.svg' },
      { text: { ru: 'Качество с мировым именем', en: 'World-class quality' }, icon: '/images/dvkran/dev__res6.svg' },
      { text: { ru: 'Квалифицированные инженерные кадры', en: 'Qualified engineering personnel' }, icon: '/images/dvkran/dev__res7.svg' },
      { text: { ru: 'Сертификация по международным стандартам', en: 'Certification to international standards' }, icon: '/images/dvkran/dev__res8.svg' },
    ],
    certsTitle: {
      ru: 'Сертификаты и благодарственные письма',
      en: 'Certificates and letters of gratitude',
    },
    geographyMapAlt: {
      ru: 'География реализованных проектов',
      en: 'Geography of completed projects',
    },
    certificates: [
      ...[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(
        (i) => `/images/dvkran/2023__05__sert${i}.jpg`
      ),
      ...[5, 4, 3, 2, 1].map((i) => `/images/dvkran/2023__05__review${i}.jpg`),
    ],
  },
  serviceItems: [
    { title: { ru: 'Технический аудит производства и подготовка технического задания', en: 'Technical audit of production and preparation of technical specifications' }, image: '/images/dvkran/2023__05__2.-tehnicheskij-audit-proizvodstva.jpg' },
    { title: { ru: 'Разработка проектно-технической документации', en: 'Development of design and technical documentation' }, image: '/images/dvkran/2019__11__service-1.png' },
    { title: { ru: 'Собственное производство комплексных шкафов автоматики', en: 'In-house production of complex automation cabinets' }, image: '/images/dvkran/2019__12__fuse-1-e1456753938959.jpg' },
    { title: { ru: 'Разработка программного обеспечения среднего и верхнего уровня', en: 'Development of middle and upper level software' }, image: '/images/dvkran/2023__05__4.2-razrabotka-po.jpg' },
    { title: { ru: 'Шеф-монтажные работы', en: 'Supervisory installation works' }, image: '/images/dvkran/2019__12__shef_montazhnye_raboty.jpg' },
    { title: { ru: 'Гарантийное и сервисное обслуживание', en: 'Warranty and service maintenance' }, image: '/images/dvkran/2023__05__7.-garantijnoe-i-servisnoe-obsluzhivanie.jpg' },
    { title: { ru: 'Удаленный мониторинг и диагностика оборудования', en: 'Remote monitoring and diagnostics of equipment' }, image: '/images/dvkran/2023__05__8.-udalennyj-monitoring.jpg' },
    { title: { ru: 'Импортозамещение и локальная техподдержка', en: 'Import substitution and local technical support' }, image: '/images/dvkran/2019__12__1497354707_marketing-top2.jpg' },
  ],
  projectItems: [
    {
      case: { ru: 'Автоматизация технологических процессов', en: 'Automation of technological processes' },
      caseEn: 'Handling Equipment Modification',
      title: { ru: 'Модернизация систем управления двумя станками поперечной резки гофрокартона.', en: 'Modernization of control systems for two corrugated cardboard cross-cutting machines.' },
      image: '/images/dvkran/2019__12__image-10.jpg',
    },
    {
      case: { ru: 'Автоматизация технологических процессов', en: 'Automation of technological processes' },
      caseEn: 'Machinery Modification',
      title: { ru: 'Восстановление работоспособности производственной линии склейки бруса.', en: 'Restoration of the operational capacity of the timber gluing production line.' },
      image: '/images/dvkran/2019__12__production-line-for-timber-gluing-1.jpg',
    },
    {
      case: { ru: 'Автоматизация технологических процессов', en: 'Automation of technological processes' },
      caseEn: 'Machinery Modification',
      title: { ru: 'Модернизация плоскошлифовальных станков', en: 'Modernization of surface grinding machines' },
      image: '/images/dvkran/2019__12__image-6.jpg',
    },
    {
      case: { ru: 'Автоматизация технологических процессов', en: 'Automation of technological processes' },
      caseEn: 'Machinery Modification',
      title: { ru: 'Модернизация гидпропрессового оборудования для изготовления прессованного кирпича', en: 'Modernization of hydraulic press equipment for the production of pressed bricks' },
      image: '/images/dvkran/2019__12__pressed-bricks-production-line-2-scaled.jpg',
    },
  ],
};

// NOTE: No in-memory cache — read file every request so admin edits show up
// immediately on the site. The JSON file is small (~20KB), and fs.readFile is fast.
export async function getContent(): Promise<ContentData> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
    return JSON.parse(raw) as ContentData;
  } catch {
    // File doesn't exist yet — write defaults and use them
    await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });
    await fs.writeFile(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(data: ContentData): Promise<void> {
  await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export { DEFAULT_CONTENT, CONTENT_FILE };

/**
 * dvkran.ru site content — bilingual (RU / EN).
 * All text and image references preserved identically.
 * Lang state drives which set of strings the UI renders.
 */

export type Lang = 'ru' | 'en';

// Local image path helper — points to /public/images/dvkran/<flat-name>
const IMG = {
  bannerBg: '/images/dvkran/2023__09__rectangle-24.png',
  product1: '/images/dvkran/2023__09__product-1.png',
  product2: '/images/dvkran/2023__09__product-2.png',
  product3: '/images/dvkran/2023__09__product-3.png',
  product4: '/images/dvkran/2023__09__product-4.png',
  product5: '/images/dvkran/2023__09__product-5.png',
  product6: '/images/dvkran/2023__09__product-6.png',
  product7: '/images/dvkran/2023__09__product-7.png',
  product8: '/images/dvkran/2023__09__product-8.png',
  homeService1: '/images/dvkran/2023__09__service-1.png',
  homeService2: '/images/dvkran/2023__09__service-2.png',
  homeService3: '/images/dvkran/2023__09__service-3.png',
  homeService4: '/images/dvkran/2023__09__service-4.png',
  homeService5: '/images/dvkran/2023__09__service-5.png',
  homeService6: '/images/dvkran/2023__09__service-6.png',
  partner1: '/images/dvkran/2023__09__partner-1.png',
  partner2: '/images/dvkran/2023__09__partner-2.png',
  partner3: '/images/dvkran/2023__09__partner-3.png',
  partner4: '/images/dvkran/2023__09__partner-4.png',
  partner5: '/images/dvkran/2023__09__partner-5.png',
  serviceAudit: '/images/dvkran/2023__05__2.-tehnicheskij-audit-proizvodstva.jpg',
  serviceDocs: '/images/dvkran/2019__11__service-1.png',
  serviceCabinets: '/images/dvkran/2019__12__fuse-1-e1456753938959.jpg',
  serviceSoftware: '/images/dvkran/2023__05__4.2-razrabotka-po.jpg',
  serviceMontage: '/images/dvkran/2019__12__shef_montazhnye_raboty.jpg',
  serviceWarranty: '/images/dvkran/2023__05__7.-garantijnoe-i-servisnoe-obsluzhivanie.jpg',
  serviceMonitoring: '/images/dvkran/2023__05__8.-udalennyj-monitoring.jpg',
  serviceImport: '/images/dvkran/2019__12__1497354707_marketing-top2.jpg',
  project1: '/images/dvkran/2019__12__image-10.jpg',
  project2: '/images/dvkran/2019__12__production-line-for-timber-gluing-1.jpg',
  project3: '/images/dvkran/2019__12__image-6.jpg',
  project4: '/images/dvkran/2019__12__pressed-bricks-production-line-2-scaled.jpg',
  resMap: '/images/dvkran/dev__resmap.png',
  res1: '/images/dvkran/dev__res1.svg',
  res2: '/images/dvkran/dev__res2.svg',
  res3: '/images/dvkran/dev__res3.svg',
  res4: '/images/dvkran/dev__res4.svg',
  res5: '/images/dvkran/dev__res5.svg',
  res6: '/images/dvkran/dev__res6.svg',
  res7: '/images/dvkran/dev__res7.svg',
  res8: '/images/dvkran/dev__res8.svg',
  news1: '/images/dvkran/2023__05__kartinka-dlya-novosti-300x192.jpg',
  logo: '/images/dvkran/logo.svg',
  footerLogo: '/images/dvkran/footer-logo.svg',
  mobileLogo: '/images/dvkran/mobile-logo.svg',
  vk: '/images/dvkran/vk.svg',
  favicon: '/images/dvkran/favicons__favicon.ico',
  rectangle24: '/images/dvkran/2023__09__rectangle-24.png',
} as const;

// ---------- Static config ----------
export const siteConfig = {
  referenceListUrl:
    'https://drive.google.com/file/d/1HalIDIAwc5oqhoHxim3A78mnr8v51ahx/view',
  yandexMapSrc:
    'https://yandex.ru/map-widget/v1/?um=constructor%3Aa5577eaa4f3e4b688a0146ae51309a8d1cba1d6d711c23dc71bdca3efcdc0854&source=constructor',
};

// ---------- Navigation ----------
export const NAV_ITEMS = [
  { id: 'about', label: { ru: 'О компании', en: 'About' } },
  { id: 'contacts', label: { ru: 'Контакты', en: 'Contacts' } },
] as const;

export type PageId = 'home' | (typeof NAV_ITEMS)[number]['id'];

// ---------- Site-wide UI strings ----------
export const UI = {
  ru: {
    brandTitle:
      'Кран ДВ — «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
    home: 'Главная',
    learnMore: 'Узнать подробнее',
    more: 'Подробнее',
    downloadReference: 'Скачать референс лист',
    downloadReferenceShort: 'Cкачать референс-лист',
    showAll: 'Показать все',
    menuOpen: 'Открыть меню',
    backToHome: 'КРАН-ДВ — на главную',
    backToTop: 'Наверх',
    // Subscribe
    haveQuestions: 'Остались вопросы?',
    namePlaceholder: 'Имя',
    phonePlaceholder: 'Телефон',
    submitRequest: 'Оставить заявку',
    privacyNote:
      'Нажимая кнопку, вы подтверждаете, что ознакомились и согласны с политикой конфиденциальности',
    successTitle: 'Ваша заявка успешно отправлена!',
    successText: 'Наш менеджер свяжется с Вами в ближайшее время.',
    ok: 'Ок',
    // Hero
    heroTitle: 'Производство грузоподъемных кранов',
    heroDescription:
      'Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
    // Home sections
    productsTitle: 'Продукция',
    engineeringServicesTitle: 'Инжиниринговые услуги',
    ourProjectsTitle: 'Наши проекты',
    responsibleSupplier: 'Ответственный поставщик',
    ourClients: 'Наши клиенты',
    // Footer
    footerText:
      'Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности',
    copyright: '2023 @ Все права защищены.',
    // Contacts
    phone: '7 4212 54-41-95',
    phoneHref: '+74212544195',
    phoneAdditional: '+7-924-108-58-70',
    email: 'kran-dv@microtermplus.ru',
    emailOffice: 'office@microtermplus.ru',
    addressFooter: '680001, г. Хабаровск, ул. Монтажная, 30, строение А, офис 21',
    addressOffice: '680012 г. Хабаровск, ул. Флегонтова, 27',
  },
  en: {
    brandTitle:
      'Kran DV — KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity.',
    home: 'Home',
    learnMore: 'Learn more',
    more: 'More',
    downloadReference: 'Download reference list',
    downloadReferenceShort: 'Download reference list',
    showAll: 'Show all',
    menuOpen: 'Open menu',
    backToHome: 'KRAN-DV — go home',
    backToTop: 'Back to top',
    haveQuestions: 'Still have questions?',
    namePlaceholder: 'Name',
    phonePlaceholder: 'Phone',
    submitRequest: 'Submit request',
    privacyNote:
      'By clicking the button, you confirm that you have read and agree to the privacy policy',
    successTitle: 'Your request has been sent successfully!',
    successText: 'Our manager will contact you shortly.',
    ok: 'OK',
    heroTitle: 'Manufacturing of lifting cranes',
    heroDescription:
      'KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity.',
    productsTitle: 'Products',
    engineeringServicesTitle: 'Engineering services',
    ourProjectsTitle: 'Our projects',
    responsibleSupplier: 'Responsible supplier',
    ourClients: 'Our clients',
    footerText:
      'KRAN-DV has the production and engineering capacity to deliver crane projects of any complexity',
    copyright: '2023 @ All rights reserved.',
    phone: '7 4212 54-41-95',
    phoneHref: '+74212544195',
    phoneAdditional: '+7-924-108-58-70',
    email: 'kran-dv@microtermplus.ru',
    emailOffice: 'office@microtermplus.ru',
    addressFooter: '680001, Khabarovsk, Montazhnaya st., 30, building A, office 21',
    addressOffice: '680012 Khabarovsk, Flegontova st., 27',
  },
} as const;

// ---------- Home: key products ----------
export const KEY_PRODUCTS = [
  { type: { ru: 'Краны козловые', en: 'Gantry cranes' }, image: IMG.product1 },
  { type: { ru: 'Краны мостовые', en: 'Bridge cranes' }, image: IMG.product2 },
  { type: { ru: 'Кран-балки', en: 'Jib cranes' }, image: IMG.product3 },
  { type: { ru: 'Крановые кабины', en: 'Crane cabins' }, image: IMG.product4 },
  { type: { ru: 'Кресло-пульты', en: 'Chair-consoles' }, image: IMG.product5 },
  { type: { ru: 'Аппаратные помещения', en: 'Control rooms' }, image: IMG.product6 },
  { type: { ru: 'Аппаратные помещения', en: 'Control rooms' }, image: IMG.product7 },
  {
    type: { ru: 'Вспомогательное оборудование', en: 'Auxiliary equipment' },
    image: IMG.product8,
  },
];

// ---------- Home: engineering services preview ----------
export const HOME_SERVICES = [
  {
    title: {
      ru: 'Проектирование подъёмно-транспортного оборудования',
      en: 'Design of lifting and transport equipment',
    },
    image: IMG.homeService1,
  },
  {
    title: { ru: 'Техническое обслуживание', en: 'Maintenance' },
    image: IMG.homeService2,
  },
  {
    title: { ru: 'Модернизация кранов', en: 'Crane modernization' },
    image: IMG.homeService3,
  },
  { title: { ru: 'Монтаж', en: 'Installation' }, image: IMG.homeService4 },
  { title: { ru: 'Доставка', en: 'Delivery' }, image: IMG.homeService5 },
  { title: { ru: 'Лизинг', en: 'Leasing' }, image: IMG.homeService6 },
];

// ---------- Home: projects preview ----------
export const HOME_PROJECTS = [
  {
    title: {
      ru: 'Кран козловой (10 тонн) для Меркурий ДВ',
      en: 'Gantry crane (10 tons) for Mercury DV',
    },
    text: {
      ru: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
      en: 'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
    },
    image: IMG.product1,
  },
  {
    title: {
      ru: 'Кран козловой (16 тонн + 16 тонн) для Корфовского каменного карьера',
      en: 'Gantry crane (16 tons + 16 tons) for Korf stone quarry',
    },
    text: {
      ru: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
      en: 'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
    },
    image: IMG.product3,
  },
  {
    title: { ru: 'Кран козловой (10 тонн) для АО «БЭТ»', en: 'Gantry crane (10 tons) for BET JSC' },
    text: {
      ru: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
      en: 'Electric gantry crane KK-16+16; operation mode A5; span 20.5 m; floor control via radio channel',
    },
    image: IMG.product2,
  },
  {
    title: {
      ru: 'Кран мостовой (16 тонн) для «Хабаровск Автомост»',
      en: 'Bridge crane (16 tons) for Khabarovsk Avtomost',
    },
    text: {
      ru: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
      en: 'Single-girder overhead crane, capacity 8 t, span 11.15 m, lifting height 5 m, operation mode A3',
    },
    image: IMG.product4,
  },
];

// ---------- Home: provider block ----------
export const PROVIDER = {
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
};

// ---------- Home: clients ----------
export const CLIENTS = [IMG.partner1, IMG.partner2, IMG.partner3, IMG.partner4, IMG.partner5];

// ---------- About page ----------
export const ABOUT = {
  title: { ru: 'О компании', en: 'About the company' },
  text: {
    ru: [
      'Инжиниринговая компания полного цикла «Микротерм Плюс» успешно специализируется на проектировании и технической разработке в области промышленной автоматизации с 2002 года. За прошедшие годы, мы достигли больших успехов, реализовали множество масштабных проектов, получили ценный опыт и наработали тесные партнерские отношения со многими российскими и иностранными компаниями. Но мы не останавливаемся на достигнутом! Мы растем, становимся продуктивнее и продолжаем аккумулировать экспертный опыт, чтобы передавать его нашим заказчикам. Наша цель стать еще более эффективной компанией, для реализации новых амбициозных задач, придерживаясь высочайших стандартов качества.',
      'Основа успеха нашей компании — это сплоченная команда. Профессионалы, нацеленные на высокий результат, которые любят свою профессию, постоянно развиваются и изучают новые технологии. Из заслуг каждого состоит наш общий успех.',
      'Новая санкционная реальность создает целый ряд ограничений. Перед российскими производителями встал вопрос о выборе стратегии дальнейшего развития. Значительная часть устоявшихся подходов в инжиниринге требует пересмотра привычных решений. Имея многолетний практический опыт, мы готовы поддержать своих заказчиков в вопросах импортонезависимости в эксплуатации иностранного оборудования и систем, а также их дальнейшей модернизации.',
    ],
    en: [
      'Microterm Plus, a full-cycle engineering company, has been successfully specializing in design and technical development in the field of industrial automation since 2002. Over the years, we have achieved great success, implemented many large-scale projects, gained valuable experience and built close partnerships with many Russian and foreign companies. But we do not rest on our laurels! We grow, become more productive and continue to accumulate expert experience to pass it on to our customers. Our goal is to become an even more efficient company for implementing new ambitious tasks while adhering to the highest quality standards.',
      'The foundation of our company\'s success is a cohesive team. Professionals focused on high results who love their profession, constantly develop and study new technologies. Our common success consists of the merits of each.',
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
    {
      text: { ru: '20 лет на рынке автоматизации', en: '20 years on the automation market' },
      icon: IMG.res1,
    },
    {
      text: {
        ru: 'Более 200 реализованных проектов',
        en: 'More than 200 completed projects',
      },
      icon: IMG.res2,
    },
    {
      text: {
        ru: 'География проектов охватывает всю Россию',
        en: 'Project geography covers all of Russia',
      },
      icon: IMG.res3,
    },
    {
      text: {
        ru: 'Точное соблюдение сроков производства работ',
        en: 'Strict adherence to work schedules',
      },
      icon: IMG.res4,
    },
    {
      text: { ru: 'Открытый диалог с заказчиком', en: 'Open dialogue with the customer' },
      icon: IMG.res5,
    },
    {
      text: { ru: 'Качество с мировым именем', en: 'World-class quality' },
      icon: IMG.res6,
    },
    {
      text: {
        ru: 'Квалифицированные инженерные кадры',
        en: 'Qualified engineering personnel',
      },
      icon: IMG.res7,
    },
    {
      text: {
        ru: 'Сертификация по международным стандартам',
        en: 'Certification to international standards',
      },
      icon: IMG.res8,
    },
  ],
  certsTitle: {
    ru: 'Сертификаты и благодарственные письма',
    en: 'Certificates and letters of gratitude',
  },
  certificates: Array.from(
    { length: 15 },
    (_, i) => `/images/dvkran/2023__05__sert${15 - i}.jpg`,
  ).concat([
    '/images/dvkran/2023__05__review5.jpg',
    '/images/dvkran/2023__05__review4.jpg',
    '/images/dvkran/2023__05__review3.jpg',
    '/images/dvkran/2023__05__review2.jpg',
    '/images/dvkran/2023__05__review1.jpg',
  ]),
  geographyMapAlt: {
    ru: 'География реализованных проектов',
    en: 'Geography of completed projects',
  },
};

// ---------- Services page ----------
export const SERVICES = {
  title: { ru: 'Услуги компании', en: 'Company services' },
  referenceListUrl: siteConfig.referenceListUrl,
  items: [
    {
      title: {
        ru: 'Технический аудит производства и подготовка технического задания',
        en: 'Technical audit of production and preparation of technical specifications',
      },
      image: IMG.serviceAudit,
    },
    {
      title: {
        ru: 'Разработка проектно-технической документации',
        en: 'Development of design and technical documentation',
      },
      image: IMG.serviceDocs,
    },
    {
      title: {
        ru: 'Собственное производство комплексных шкафов автоматики',
        en: 'In-house production of complex automation cabinets',
      },
      image: IMG.serviceCabinets,
    },
    {
      title: {
        ru: 'Разработка программного обеспечения среднего и верхнего уровня',
        en: 'Development of middle and upper level software',
      },
      image: IMG.serviceSoftware,
    },
    {
      title: { ru: 'Шеф-монтажные работы', en: 'Supervisory installation works' },
      image: IMG.serviceMontage,
    },
    {
      title: {
        ru: 'Гарантийное и сервисное обслуживание',
        en: 'Warranty and service maintenance',
      },
      image: IMG.serviceWarranty,
    },
    {
      title: {
        ru: 'Удаленный мониторинг и диагностика оборудования',
        en: 'Remote monitoring and diagnostics of equipment',
      },
      image: IMG.serviceMonitoring,
    },
    {
      title: {
        ru: 'Импортозамещение и локальная техподдержка',
        en: 'Import substitution and local technical support',
      },
      image: IMG.serviceImport,
    },
  ],
};

// ---------- Projects page ----------
export const PROJECTS = {
  title: {
    ru: 'Портфолио выполненных проектов',
    en: 'Portfolio of completed projects',
  },
  filterLabel: { ru: 'Выбрать по направлению:', en: 'Filter by direction:' },
  filterAll: { ru: 'Все', en: 'All' },
  filterButton: { ru: 'Показать все', en: 'Show all' },
  filterOptions: [
    { value: '0', label: { ru: 'Все', en: 'All' } },
    {
      value: '4',
      label: {
        ru: 'Модернизация станков и оборудования',
        en: 'Modernization of machines and equipment',
      },
    },
    {
      value: '5',
      label: {
        ru: 'Модернизация подъемно-транспортного оборудования',
        en: 'Modernization of lifting and transport equipment',
      },
    },
    {
      value: '6',
      label: {
        ru: 'Автоматизация технологических процессов',
        en: 'Automation of technological processes',
      },
    },
    {
      value: '7',
      label: { ru: 'Дробометное оборудование', en: 'Shot-blasting equipment' } },
  ],
  items: [
    {
      case: {
        ru: 'Автоматизация технологических процессов',
        en: 'Automation of technological processes',
      },
      caseEn: 'Handling Equipment Modification',
      title: {
        ru: 'Модернизация систем управления двумя станками поперечной резки гофрокартона.',
        en: 'Modernization of control systems for two corrugated cardboard cross-cutting machines.',
      },
      image: IMG.project1,
    },
    {
      case: {
        ru: 'Автоматизация технологических процессов',
        en: 'Automation of technological processes',
      },
      caseEn: 'Machinery Modification',
      title: {
        ru: 'Восстановление работоспособности производственной линии склейки бруса.',
        en: 'Restoration of the operational capacity of the timber gluing production line.',
      },
      image: IMG.project2,
    },
    {
      case: {
        ru: 'Автоматизация технологических процессов',
        en: 'Automation of technological processes',
      },
      caseEn: 'Machinery Modification',
      title: {
        ru: 'Модернизация плоскошлифовальных станков',
        en: 'Modernization of surface grinding machines',
      },
      image: IMG.project3,
    },
    {
      case: {
        ru: 'Автоматизация технологических процессов',
        en: 'Automation of technological processes',
      },
      caseEn: 'Machinery Modification',
      title: {
        ru: 'Модернизация гидпропрессового оборудования для изготовления прессованного кирпича',
        en: 'Modernization of hydraulic press equipment for the production of pressed bricks',
      },
      image: IMG.project4,
    },
  ],
};

// ---------- Contacts page ----------
export const CONTACTS = {
  title: { ru: 'Контакты', en: 'Contacts' },
  officeName: { ru: 'Головной офис:', en: 'Head office:' },
  officeAddress: {
    ru: '680012 г. Хабаровск, ул. Флегонтова, 27',
    en: '680012 Khabarovsk, Flegontova st., 27',
  },
  phones: ['7 4212 54-41-95', '+7-924-108-58-70'],
  email: 'office@microtermplus.ru',
  mapSrc: siteConfig.yandexMapSrc,
  mapTitle: { ru: 'Карта — офис КРАН-ДВ', en: 'Map — KRAN-DV office' },
  phoneLabel: { ru: 'Тел.:', en: 'Tel.:' },
  emailLabel: { ru: 'E-mail:', en: 'E-mail:' },
};

// ---------- Helper to pick a string for a given language ----------
export function t<T extends { ru: string; en: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}

export { IMG };

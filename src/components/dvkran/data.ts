/**
 * dvkran.ru site content — exact copy of source site data.
 * All text and image references preserved identically.
 */

// Local image path helper — points to /public/images/dvkran/<flat-name>
const IMG = {
  // Hero / banner
  bannerBg: '/images/dvkran/2023__09__rectangle-24.png',
  // Product thumbnails (key-products on home + project thumbnails)
  product1: '/images/dvkran/2023__09__product-1.png',
  product2: '/images/dvkran/2023__09__product-2.png',
  product3: '/images/dvkran/2023__09__product-3.png',
  product4: '/images/dvkran/2023__09__product-4.png',
  product5: '/images/dvkran/2023__09__product-5.png',
  product6: '/images/dvkran/2023__09__product-6.png',
  product7: '/images/dvkran/2023__09__product-7.png',
  product8: '/images/dvkran/2023__09__product-8.png',
  // Home services icons
  homeService1: '/images/dvkran/2023__09__service-1.png',
  homeService2: '/images/dvkran/2023__09__service-2.png',
  homeService3: '/images/dvkran/2023__09__service-3.png',
  homeService4: '/images/dvkran/2023__09__service-4.png',
  homeService5: '/images/dvkran/2023__09__service-5.png',
  homeService6: '/images/dvkran/2023__09__service-6.png',
  // Partners
  partner1: '/images/dvkran/2023__09__partner-1.png',
  partner2: '/images/dvkran/2023__09__partner-2.png',
  partner3: '/images/dvkran/2023__09__partner-3.png',
  partner4: '/images/dvkran/2023__09__partner-4.png',
  partner5: '/images/dvkran/2023__09__partner-5.png',
  // Service page detail images
  serviceAudit: '/images/dvkran/2023__05__2.-tehnicheskij-audit-proizvodstva.jpg',
  serviceDocs: '/images/dvkran/2019__11__service-1.png',
  serviceCabinets: '/images/dvkran/2019__12__fuse-1-e1456753938959.jpg',
  serviceSoftware: '/images/dvkran/2023__05__4.2-razrabotka-po.jpg',
  serviceMontage: '/images/dvkran/2019__12__shef_montazhnye_raboty.jpg',
  serviceWarranty: '/images/dvkran/2023__05__7.-garantijnoe-i-servisnoe-obsluzhivanie.jpg',
  serviceMonitoring: '/images/dvkran/2023__05__8.-udalennyj-monitoring.jpg',
  serviceImport: '/images/dvkran/2019__12__1497354707_marketing-top2.jpg',
  // Project page images
  project1: '/images/dvkran/2019__12__image-10.jpg',
  project2: '/images/dvkran/2019__12__production-line-for-timber-gluing-1.jpg',
  project3: '/images/dvkran/2019__12__image-6.jpg',
  project4: '/images/dvkran/2019__12__pressed-bricks-production-line-2-scaled.jpg',
  // About page
  resMap: '/images/dvkran/dev__resmap.png',
  res1: '/images/dvkran/dev__res1.svg',
  res2: '/images/dvkran/dev__res2.svg',
  res3: '/images/dvkran/dev__res3.svg',
  res4: '/images/dvkran/dev__res4.svg',
  res5: '/images/dvkran/dev__res5.svg',
  res6: '/images/dvkran/dev__res6.svg',
  res7: '/images/dvkran/dev__res7.svg',
  res8: '/images/dvkran/dev__res8.svg',
  // News
  news1: '/images/dvkran/2023__05__kartinka-dlya-novosti-300x192.jpg',
  // Logo + icons
  logo: '/images/dvkran/logo.svg',
  footerLogo: '/images/dvkran/footer-logo.svg',
  mobileLogo: '/images/dvkran/mobile-logo.svg',
  vk: '/images/dvkran/vk.svg',
  // Favicon
  favicon: '/images/dvkran/favicons__favicon.ico',
  // Products (the test product on products page)
  rectangle24: '/images/dvkran/2023__09__rectangle-24.png',
} as const;

export const siteConfig = {
  brand: 'КРАН-ДВ',
  brandFullTitle:
    'Кран ДВ — «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
  phone: '7 4212 54-41-95',
  phoneHref: '+74212544195',
  phoneAdditional: '+7-924-108-58-70',
  email: 'kran-dv@microtermplus.ru',
  emailOffice: 'office@microtermplus.ru',
  addressFooter: '680001, г. Хабаровск, ул. Монтажная, 30, строение А, офис 21',
  addressOffice: '680012 г. Хабаровск, ул. Флегонтова, 27',
  copyright: '2023 @ Все права защищены.',
  referenceListUrl:
    'https://drive.google.com/file/d/1HalIDIAwc5oqhoHxim3A78mnr8v51ahx/view',
  yandexMapSrc:
    'https://yandex.ru/map-widget/v1/?um=constructor%3Aa5577eaa4f3e4b688a0146ae51309a8d1cba1d6d711c23dc71bdca3efcdc0854&source=constructor',
};

export const NAV_ITEMS = [
  { id: 'about', label: 'О компании' },
  { id: 'products', label: 'Продукция' },
  { id: 'service', label: 'Услуги' },
  { id: 'project', label: 'Проекты' },
  { id: 'vacancy', label: 'Вакансии' },
  { id: 'news', label: 'Новости' },
  { id: 'contacts', label: 'Контакты' },
] as const;

export type PageId = 'home' | (typeof NAV_ITEMS)[number]['id'];

// Home: hero banner
export const HERO = {
  title: 'Производство грузоподъемных кранов',
  description:
    'Компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности.',
  ctaLabel: 'Узнать подробнее',
  ctaHref: 'service' as PageId,
};

// Home: key products (left list with image hover)
export const KEY_PRODUCTS = [
  { type: 'Краны козловые', image: IMG.product1 },
  { type: 'Краны мостовые', image: IMG.product2 },
  { type: 'Кран-балки', image: IMG.product3 },
  { type: 'Крановые кабины', image: IMG.product4 },
  { type: 'Кресло-пульты', image: IMG.product5 },
  { type: 'Аппаратные помещения', image: IMG.product6 },
  { type: 'Аппаратные помещения', image: IMG.product7 },
  { type: 'Вспомогательное оборудование', image: IMG.product8 },
];

// Home: engineering services preview
export const HOME_SERVICES = [
  {
    title: 'Проектирование подъёмно-транспортного оборудования',
    image: IMG.homeService1,
  },
  { title: 'Техническое обслуживание', image: IMG.homeService2 },
  { title: 'Модернизация кранов', image: IMG.homeService3 },
  { title: 'Монтаж', image: IMG.homeService4 },
  { title: 'Доставка', image: IMG.homeService5 },
  { title: 'Лизинг', image: IMG.homeService6 },
];

// Home: projects preview
export const HOME_PROJECTS = [
  {
    title: 'Кран козловой (10 тонн) для Меркурий ДВ',
    text: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
    image: IMG.product1,
  },
  {
    title: 'Кран козловой (16 тонн + 16 тонн) для Корфовского каменного карьера',
    text: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
    image: IMG.product3,
  },
  {
    title: 'Кран козловой (10 тонн) для АО «БЭТ»',
    text: 'Кран козловой электрический КК-16+16; режима работы А5; пролётом 20,5 м; управлением с пола по радиоканалу',
    image: IMG.product2,
  },
  {
    title: 'Кран мостовой (16 тонн) для «Хабаровск Автомост»',
    text: 'Кран мостовой однобалочный опорный г/п 8 т. пролёт 11,15 м. высота подъёма 5 м. режим работы А3',
    image: IMG.product4,
  },
];

// Home: provider block
export const PROVIDER = {
  title: 'Ответственный поставщик',
  paragraphs: [
    'На территории регионов Дальнего Востока.',
    'Компания «КРАН-ДВ» находится в Хабаровске. Это обеспечивает оперативную коммуникацию и логистику с Заказчиком со всего ДФО.',
    'Если вы заинтересованы в нашей продукции, отправляйте завки на нашу электронную почту и получите быстрый ответ.',
  ],
};

// Home: clients
export const CLIENTS = [IMG.partner1, IMG.partner2, IMG.partner3, IMG.partner4, IMG.partner5];

// About page
export const ABOUT = {
  title: 'О компании',
  text: [
    'Инжиниринговая компания полного цикла «Микротерм Плюс» успешно специализируется на проектировании и технической разработке в области промышленной автоматизации с 2002 года. За прошедшие годы, мы достигли больших успехов, реализовали множество масштабных проектов, получили ценный опыт и наработали тесные партнерские отношения со многими российскими и иностранными компаниями. Но мы не останавливаемся на достигнутом! Мы растем, становимся продуктивнее и продолжаем аккумулировать экспертный опыт, чтобы передавать его нашим заказчикам. Наша цель стать еще более эффективной компанией, для реализации новых амбициозных задач, придерживаясь высочайших стандартов качества.',
    'Основа успеха нашей компании — это сплоченная команда. Профессионалы, нацеленные на высокий результат, которые любят свою профессию, постоянно развиваются и изучают новые технологии. Из заслуг каждого состоит наш общий успех.',
    'Новая санкционная реальность создает целый ряд ограничений. Перед российскими производителями встал вопрос о выборе стратегии дальнейшего развития. Значительная часть устоявшихся подходов в инжиниринге требует пересмотра привычных решений. Имея многолетний практический опыт, мы готовы поддержать своих заказчиков в вопросах импортонезависимости в эксплуатации иностранного оборудования и систем, а также их дальнейшей модернизации.',
  ],
  signature: 'Генеральный директор ООО «Микротерм Плюс»\nАтясов Олег Валерьевич',
  industryTitle: 'Индустрии и география реализованных проектов',
  industries: [
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
  mtTodayTitle: 'МИКРОТЕРМ ПЛЮС сегодня',
  mtTodayTiles: [
    { icon: IMG.res1, text: '20 лет на рынке автоматизации' },
    { icon: IMG.res2, text: 'Более 200 реализованных проектов' },
    { icon: IMG.res3, text: 'География проектов охватывает всю Россию' },
    { icon: IMG.res4, text: 'Точное соблюдение сроков производства работ' },
    { icon: IMG.res5, text: 'Открытый диалог с заказчиком' },
    { icon: IMG.res6, text: 'Качество с мировым именем' },
    { icon: IMG.res7, text: 'Квалифицированные инженерные кадры' },
    { icon: IMG.res8, text: 'Сертификация по международным стандартам' },
  ],
  certsTitle: 'Сертификаты и благодарственные письма',
  certificates: Array.from({ length: 15 }, (_, i) => `/images/dvkran/2023__05__sert${15 - i}.jpg`).concat([
    '/images/dvkran/2023__05__review5.jpg',
    '/images/dvkran/2023__05__review4.jpg',
    '/images/dvkran/2023__05__review3.jpg',
    '/images/dvkran/2023__05__review2.jpg',
    '/images/dvkran/2023__05__review1.jpg',
  ]),
};

// Products page (single test entry as on source)
export const PRODUCTS = {
  title: 'Услуги компании',
  items: [
    {
      title: 'Тестовая продукция',
      image: IMG.rectangle24,
      href: '#',
    },
  ],
};

// Services page
export const SERVICES = {
  title: 'Услуги компании',
  referenceListUrl: siteConfig.referenceListUrl,
  items: [
    {
      title: 'Технический аудит производства и подготовка технического задания',
      image: IMG.serviceAudit,
    },
    {
      title: 'Разработка проектно-технической документации',
      image: IMG.serviceDocs,
    },
    {
      title: 'Собственное производство комплексных шкафов автоматики',
      image: IMG.serviceCabinets,
    },
    {
      title: 'Разработка программного обеспечения среднего и верхнего уровня',
      image: IMG.serviceSoftware,
    },
    { title: 'Шеф-монтажные работы', image: IMG.serviceMontage },
    {
      title: 'Гарантийное и сервисное обслуживание',
      image: IMG.serviceWarranty,
    },
    {
      title: 'Удаленный мониторинг и диагностика оборудования',
      image: IMG.serviceMonitoring,
    },
    {
      title: 'Импортозамещение и локальная техподдержка',
      image: IMG.serviceImport,
    },
  ],
};

// Projects page
export const PROJECTS = {
  title: 'Портфолио выполненных проектов',
  filterLabel: 'Выбрать по направлению:',
  filterAll: 'Все',
  filterButton: 'Показать все',
  filterOptions: [
    { value: '0', label: 'Все' },
    { value: '4', label: 'Модернизация станков и оборудования' },
    { value: '5', label: 'Модернизация подъемно-транспортного оборудования' },
    { value: '6', label: 'Автоматизация технологических процессов' },
    { value: '7', label: 'Дробометное оборудование' },
  ],
  items: [
    {
      case: 'Автоматизация технологических процессов',
      caseEn: 'Handling Equipment Modification',
      title:
        'Модернизация систем управления двумя станками поперечной резки гофрокартона.',
      image: IMG.project1,
    },
    {
      case: 'Автоматизация технологических процессов',
      caseEn: 'Machinery Modification',
      title: 'Восстановление работоспособности производственной линии склейки бруса.',
      image: IMG.project2,
    },
    {
      case: 'Автоматизация технологических процессов',
      caseEn: 'Machinery Modification',
      title: 'Модернизация плоскошлифовальных станков',
      image: IMG.project3,
    },
    {
      case: 'Автоматизация технологических процессов',
      caseEn: 'Machinery Modification',
      title:
        'Модернизация гидпропрессового оборудования для изготовления прессованного кирпича',
      image: IMG.project4,
    },
  ],
};

// Vacancy page
export const VACANCY = {
  title: 'Вакансии',
  jobs: [
    {
      title: 'Инженер АСУ ТП',
      salary: 'от 80 000 ₽/месяц',
      requirements: 'Опыт работы от 3 лет, полная занятость',
      href: '#',
    },
  ],
};

// News page
export const NEWS = {
  title: 'Новости',
  tags: [{ label: '20лет', value: '20let' }],
  years: [{ label: '2023', value: '2023' }],
  items: [
    {
      date: '22.05.2023',
      title: '20 лет – это только начало!',
      image: IMG.news1,
      tag: '20лет',
      href: '#',
    },
  ],
};

// Contacts page
export const CONTACTS = {
  title: 'Контакты',
  officeName: 'Головной офис:',
  officeAddress: siteConfig.addressOffice,
  phones: [siteConfig.phone, siteConfig.phoneAdditional],
  email: siteConfig.emailOffice,
  mapSrc: siteConfig.yandexMapSrc,
};

export { IMG };

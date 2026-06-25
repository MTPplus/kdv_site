import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-mont",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://dvkran.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "КРАН-ДВ — производство грузоподъёмных кранов в Хабаровске | Козловые и мостовые краны Дальний Восток",
  description:
    "Дальневосточная компания «КРАН-ДВ» — производство и монтаж грузоподъёмных кранов (козловые, мостовые, кран-балки) в Хабаровске. Проектирование, модернизация, обслуживание кранового оборудования по всему ДФО. ОКПД2: 28.22.12, 28.22.14, 28.22.11, 28.22.19.",
  keywords: [
    "КРАН-ДВ",
    "грузоподъемные краны",
    "козловые краны",
    "мостовые краны",
    "кран-балки",
    "крановые кабины",
    "производство кранов",
    "проектирование кранов",
    "модернизация кранов",
    "монтаж кранов",
    "Хабаровск",
    "Дальний Восток",
    "ДФО",
    "крановое оборудование",
    "подъемно-транспортное оборудование",
    "ОКПД2 28.22.12",
    "ОКПД2 28.22.14",
    "ОКПД2 28.22.11",
    "ОКПД2 28.22.19",
  ],
  authors: [{ name: "КРАН-ДВ" }],
  creator: "КРАН-ДВ",
  publisher: "КРАН-ДВ",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "КРАН-ДВ — производство грузоподъёмных кранов в Хабаровске",
    description:
      "Дальневосточная компания «КРАН-ДВ» — производство, монтаж и обслуживание козловых и мостовых кранов в Хабаровске. Работаем по всему ДФО.",
    url: SITE_URL,
    siteName: "КРАН-ДВ",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "КРАН-ДВ — производство грузоподъёмных кранов в Хабаровске",
    description:
      "Дальневосточная компания «КРАН-ДВ» — производство, монтаж и обслуживание кранового оборудования. Хабаровск, ДФО.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/dvkran/favicons__favicon.ico",
  },
  other: {
    "geo.region": "RU-KHA",
    "geo.placename": "Хабаровск",
    "geo.position": "48.476335;135.074843",
    "ICBM": "48.476335, 135.074843",
    "DC.title": "КРАН-ДВ — производство грузоподъёмных кранов",
    "DC.subject": "Производство подъёмно-транспортного оборудования, ОКПД2 28.22",
    "DC.description":
      "Дальневосточная компания «КРАН-ДВ» — производство козловых и мостовых кранов в Хабаровске. ОКПД2: 28.22.12, 28.22.14, 28.22.11, 28.22.19.",
  },
};

// JSON-LD structured data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "КРАН-ДВ",
  alternateName: "Кран ДВ",
  legalName: 'Компания «КРАН-ДВ»',
  description:
    "Дальневосточная компания «КРАН-ДВ» имеет производственные и инжиниринговые мощности для выполнения крановых проектов различного уровня сложности. Производство козловых, мостовых кранов, кран-балок, крановых кабин, кресло-пультов и аппаратных помещений в Хабаровске.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/dvkran/logo.svg`,
  email: "kran-dv@microtermplus.ru",
  telephone: "+7-4212-54-41-95",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Флегонтова, 27",
    addressLocality: "Хабаровск",
    addressRegion: "Хабаровский край",
    postalCode: "680012",
    addressCountry: "RU",
  },
  areaServed: [
    { "@type": "Place", name: "Хабаровск" },
    { "@type": "Place", name: "Хабаровский край" },
    { "@type": "Place", name: "Дальневосточный федеральный округ" },
    { "@type": "Place", name: "Приморский край" },
    { "@type": "Place", name: "Амурская область" },
    { "@type": "Place", name: "Якутия" },
    { "@type": "Place", name: "Сахалинская область" },
  ],
  knowsAbout: [
    "Производство грузоподъёмных кранов",
    "Козловые краны (ОКПД2 28.22.14)",
    "Мостовые краны (ОКПД2 28.22.12)",
    "Кран-балки (ОКПД2 28.22.11)",
    "Подъёмно-транспортное оборудование (ОКПД2 28.22.19)",
    "Проектирование кранового оборудования",
    "Модернизация кранов",
    "Монтаж грузоподъёмных кранов",
    "Техническое обслуживание кранов",
    "Крановые кабины",
    "Кресло-пульты крановщика",
    "Аппаратные помещения",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Краны козловые электрические",
        category: "ОКПД2 28.22.14",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Краны мостовые электрические",
        category: "ОКПД2 28.22.12",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Кран-балки (тали электрические)",
        category: "ОКПД2 28.22.11",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Проектирование подъёмно-транспортного оборудования",
        category: "ОКПД2 28.22.19",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Монтаж и модернизация кранов",
        category: "ОКПД2 28.22.19",
      },
    },
  ],
};

// JSON-LD for WebSite
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "КРАН-ДВ",
  url: SITE_URL,
  inLanguage: "ru-RU",
  description:
    "Производство грузоподъёмных кранов в Хабаровске. Козловые, мостовые краны, кран-балки. Дальневосточная компания КРАН-ДВ.",
};

// JSON-LD for LocalBusiness
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "КРАН-ДВ",
  image: `${SITE_URL}/images/dvkran/logo.svg`,
  telephone: "+7-4212-54-41-95",
  email: "kran-dv@microtermplus.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Флегонтова, 27",
    addressLocality: "Хабаровск",
    addressRegion: "Хабаровский край",
    postalCode: "680012",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.476335,
    longitude: 135.074843,
  },
  url: SITE_URL,
  priceRange: "$$",
  areaServed: "Дальневосточный федеральный округ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}

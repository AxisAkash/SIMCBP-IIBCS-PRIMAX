import type { Metadata, Viewport } from 'next';
import '@simcbp/design-tokens/css';
import './globals.css';
import { LOCALE_META } from '@simcbp/i18n';
import { getLocale } from '@/lib/i18n/server';
import { getMessages } from '@/lib/i18n/messages';
import { I18nProvider } from '@/lib/i18n/provider';

export const metadata: Metadata = {
  title: {
    default: 'MCBP-MIS — MoWCA Integrated MIS',
    template: '%s · MCBP-MIS',
  },
  description:
    'Mother and Child Benefit Programme — Integrated Management Information System (MoWCA, Bangladesh).',
  applicationName: 'MCBP-MIS',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#185541',
};

// Pre-paint theme resolution to avoid a flash of incorrect theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var dark=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',dark?'dark':'light');}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = getMessages(locale);

  return (
    <html lang={locale} dir={LOCALE_META[locale].dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-canvas text-foreground antialiased">
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

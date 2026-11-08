import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import { ExamProgressProvider } from '@/context/ExamProgressContext';
import { CourseDisplayProvider } from '@/context/CourseDisplayContext';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${APP_NAME} — Plateforme de Formation IA`,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Neutralisation préventive des attributs injectés par des extensions (ex: Bitdefender TrafficLight)
              (function() {
                try {
                  const origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (
                      name === 'bis_skin_checked' ||
                      name === 'bis_register' ||
                      (typeof name === 'string' && (name.startsWith('__processed_') || name.startsWith('bis_')))
                    ) {
                      return;
                    }
                    return origSetAttr.apply(this, arguments);
                  };
                  if (typeof document !== 'undefined') {
                    document.querySelectorAll?.('[bis_skin_checked]').forEach(function(el) {
                      el.removeAttribute('bis_skin_checked');
                    });
                    document.body?.removeAttribute('bis_register');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <ExamProgressProvider>
            <CourseDisplayProvider>
              <MainLayout>{children}</MainLayout>
            </CourseDisplayProvider>
          </ExamProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

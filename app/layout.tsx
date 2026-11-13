import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import { ExamProgressProvider } from '@/context/ExamProgressContext';
import { ChapterProgressProvider } from '@/context/ChapterProgressContext';
import { CourseDisplayProvider } from '@/context/CourseDisplayContext';
import { ExtensionCleanUp } from '@/components/common/ExtensionCleanUp';
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
      <body suppressHydrationWarning className="min-h-full bg-slate-50 text-slate-900 font-sans ">
        <ExtensionCleanUp />
        <AuthProvider>
          <ExamProgressProvider>
            <ChapterProgressProvider>
              <CourseDisplayProvider>
                <MainLayout>{children}</MainLayout>
              </CourseDisplayProvider>
            </ChapterProgressProvider>
          </ExamProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

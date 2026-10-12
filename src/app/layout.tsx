import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';
import { ToastProvider } from '@/components/ui/Toast';
import { ColorThemeProvider } from '@/components/theme/ColorThemeProvider';
import { Poppins, DM_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { COLOR_THEME_STORAGE_KEY, DEFAULT_COLOR_THEME } from '@/lib/color-themes';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KisanDost POS — Pesticide & Agri-Input Shop Management',
  description: 'Multi-branch point of sale, FEFO batch tracking, udhaar ledgers, and cash reconciliation for pesticide shops in Pakistan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-color-theme={DEFAULT_COLOR_THEME}
      className={cn(poppins.variable, dmSans.variable, inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(COLOR_THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t)document.documentElement.setAttribute('data-color-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ToastProvider>
          <ColorThemeProvider>
            <AppShell>
              {children}
            </AppShell>
          </ColorThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TanStackQueryProvider } from '@/components/provider/QueryClientProvider';
import { DataProvider } from '@/components/provider/DataProvider';

export const metadata: Metadata = {
  title: 'Home | News-eye ',
  description: 'Welcome to News-eye',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DataProvider>
        <TanStackQueryProvider>
          <body
            style={{ fontFamily: 'SF_HambakSnow, sans-serif' }}
            className="flex min-h-screen justify-center"
          >
            <div className="w-full ">{children}</div>
          </body>
        </TanStackQueryProvider>
      </DataProvider>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | News-eye ',
  description: 'Login My App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ fontFamily: 'SF_HambakSnow, sans-serif' }}
      className="flex min-h-screen items-center justify-center bg-[#f2f2f2]"
    >
      <div className="w-full">{children}</div>
    </div>
  );
}

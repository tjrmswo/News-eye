import type { Metadata } from 'next';
import '@/app/globals.css';
import SideTab from '@/components/admin/sideTab';

export const metadata: Metadata = {
  title: 'Statistics | News-eye ',
  description: 'Analyze news data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ fontFamily: 'SF_HambakSnow, sans-serif' }}
      className="flex min-h-screen justify-center bg-[#F4F4F4]"
    >
      <div id="modal-container"></div>
      <div className="flex flex-row items-center justify-around w-full">
        <SideTab />
        <div className="size-full p-7">{children}</div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { TanStackQueryProvider, DataProvider } from "@/shared";

export const metadata: Metadata = {
  title: "Home | News-eye ",
  description: "Welcome to News-eye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <TanStackQueryProvider>
        <DataProvider>
          <body className="font-hambak flex min-h-screen w-full justify-center">
            <Suspense
              fallback={
                <div className="flex min-h-screen w-full items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
                    <p className="text-sm text-gray-600">로딩중...</p>
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </body>
        </DataProvider>
      </TanStackQueryProvider>
    </html>
  );
}

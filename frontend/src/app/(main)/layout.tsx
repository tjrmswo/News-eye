"use client";
import { Footer, Header } from "@/shared";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

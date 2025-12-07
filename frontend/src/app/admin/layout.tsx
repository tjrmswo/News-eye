import type { Metadata } from "next";
import "@/app/globals.css";
import SideTab from "@/components/admin/sideTab";

export const metadata: Metadata = {
  title: "Statistics | News-eye ",
  description: "Analyze news data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-hambak flex min-h-screen w-full justify-center bg-[#F4F4F4]">
      <div id="modal-container"></div>
      <div className="flex w-full flex-row items-center justify-around">
        <SideTab />
        <div className="size-full p-7">{children}</div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Search, ChartBar } from "lucide-react";
import { Logo, NavTabs } from "@/shared";
import useHandleHeader from "../model/useHandleHeader";

export default function Header() {
  const { handleInputComponent } = useHandleHeader();

  return (
    <header className="flex w-4xl flex-row items-center justify-around p-10">
      <Logo />
      <NavTabs />

      <Search
        size={30}
        className="cursor-pointer rounded-sm p-1 text-[black] hover:bg-[#f3f3f3]"
        onClick={handleInputComponent}
      />
      <Link href={"/admin"}>
        <ChartBar
          className="cursor-pointer rounded-sm p-1 text-[black] hover:bg-[#f3f3f3]"
          size={30}
        />
      </Link>
    </header>
  );
}

"use client";
import React from "react";
import { tabNames } from "../lib/constants";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import useHandleHeader from "../model/useHandleHeader";

export default function NavTabs() {
  const { handleInput, keyDownEnter, componentChange } = useHandleHeader();

  // ✅ 현재 query parameter의 field 값 가져오기
  const searchParams = useSearchParams();
  const currentField = searchParams.get("field");

  return (
    <>
      {componentChange ? (
        <div className="flex w-md items-center justify-center">
          <div className="input flex w-md items-center justify-center rounded-lg bg-[#FAFAFA] text-[#818181]">
            <input
              className="mb-2 w-sm border-b-2 bg-[rgba(255,255,255,0)] p-1"
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => keyDownEnter(e)}
            />
          </div>
        </div>
      ) : (
        <div className="showTabs flex w-md flex-row justify-between font-[Open_Sans]">
          {tabNames.map((name, i) => {
            const isActive = currentField === name.value;
            if (isActive) {
              return (
                <button key={i}>
                  <span
                    className="rounded-2xl bg-[#f3f3f3] p-2 text-[#797979]"
                    tabIndex={0}
                  >
                    {name.name}
                  </span>
                </button>
              );
            }
            return (
              <Link href={name.href} key={i}>
                <span
                  className="cursor-pointer rounded-2xl p-2 transition-colors duration-300 hover:bg-[#f3f3f3] focus:bg-[#f3f3f3] focus:text-[#797979]"
                  tabIndex={0}
                >
                  {name.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

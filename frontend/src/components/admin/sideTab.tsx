'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// constants
import { AdminTabs } from '@/constants/admin';

// types
import { IconMapType } from '@/types/admin';

// icons
import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

export default function SideTab() {
  const IconMap: IconMapType = {
    dashboard: ChartBarDecreasing,
    analysis: ChartNoAxesCombined,
    LogOut: LogOut,
    DeleteID: UserRoundX,
  };

  return (
    <aside className="m-5 flex size-3xs flex-col items-center gap-3 rounded-md bg-white">
      <div className="relative right-3 mt-4 flex flex-row items-center">
        <Image src={'/images/news-eye.png'} alt="로고" width={50} height={50} />
        <span className="text-lg">News-eye</span>
      </div>
      <div className="flex h-[8rem] cursor-pointer flex-col items-center justify-between">
        {AdminTabs.map((tab) => {
          const IconComponent = IconMap[tab.name];
          return (
            <Link key={tab.name} href={`/admin/${tab.name}`}>
              <div className="flex w-[7.8rem] h-[1.5rem] w-full flex-row items-center rounded-sm hover:bg-[#F3F3F3] px-2">
                {IconComponent ? (
                  <IconComponent className="size-[1rem]" />
                ) : null}
                <span className="ml-3 text-md">{tab.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

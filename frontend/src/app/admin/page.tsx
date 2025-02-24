'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// icons
import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

// components
import Dashboard from '@/app/admin/dashboard/page';
import Analyst from '@/app/admin/analysis/page';

// types
import { ComponentsType, IconMapType } from '@/types/admin';
// constants
import { AdminTabs } from '@/constants/admin';
import Modal from '@/components/modal';
import Link from 'next/link';

export default function Admin({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-4/5 w-full flex-col items-center justify-center">
      {children}
    </article>
  );
}

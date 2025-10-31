'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

// components
import Modal from '@/components/modal';
import DeleteModal from './deleteModal';

import LogoutModal from './logOutModal';

export default function SideTab() {
  const [modalStatus, setModalStatus] = useState({
    delete: false,
    logout: false,
    currentPage: '',
  });
  const { currentPage } = modalStatus;

  function handleModal(modalName: string) {
    if (modalName === 'logout') {
      setModalStatus({
        ...modalStatus,
        logout: !modalStatus.logout,
        currentPage: modalName,
      });
    } else {
      setModalStatus({
        ...modalStatus,
        delete: !modalStatus.delete,
        currentPage: modalName,
      });
    }
  }

  const IconMap: IconMapType = {
    dashboard: ChartBarDecreasing,
    analysis: ChartNoAxesCombined,
    logout: LogOut,
    deleteID: UserRoundX,
  };

  useEffect(() => {
    console.log(modalStatus);
  }, [modalStatus]);

  return (
    <aside className="m-5 flex size-3xs flex-col items-center gap-3 rounded-md bg-white">
      <div className="relative right-3 mt-4 flex flex-row items-center">
        <Image src={'/images/news-eye.png'} alt="로고" width={50} height={50} />
        <span className="text-lg">News-eye</span>
      </div>
      <div className="flex h-32 cursor-pointer flex-col items-center justify-between">
        {AdminTabs.map((tab, i) => {
          const IconComponent = IconMap[tab.name];
          if (tab.name === 'dashboard' || tab.name === 'analysis') {
            return (
              <Link className="w-40" key={i} href={`/admin/${tab.name}`}>
                <div className="flex h-6 w-full flex-row items-center justify-center rounded-sm px-2 hover:bg-[#F3F3F3]">
                  {IconComponent ? <IconComponent className="size-4" /> : null}
                  <span className="text-md ml-3">{tab.name}</span>
                </div>
              </Link>
            );
          } else if (tab.name === 'logout') {
            return (
              <div key={i} className="flex w-40 flex-col">
                <div
                  className="flex h-6 w-full flex-row items-center justify-center rounded-sm hover:bg-[#F3F3F3]"
                  onClick={() => handleModal(tab.name)}
                >
                  {IconComponent ? <IconComponent className="size-4" /> : null}
                  <span className="text-md ml-3">{tab.name}</span>
                </div>
                {modalStatus.logout && (
                  <Modal
                    handleModal={handleModal}
                    width={28}
                    height={26}
                    currentPage={currentPage}
                  >
                    <LogoutModal />
                  </Modal>
                )}
              </div>
            );
          } else if (tab.name === 'deleteID') {
            return (
              <div key={i} className="flex w-40 flex-col">
                <div
                  className="flex h-6 w-full flex-row items-center justify-center rounded-sm hover:bg-[#F3F3F3]"
                  onClick={() => handleModal(tab.name)}
                >
                  {IconComponent ? <IconComponent className="size-4" /> : null}
                  <span className="text-md ml-3">{tab.name}</span>
                </div>
                {modalStatus.delete && (
                  <Modal
                    key={i}
                    handleModal={handleModal}
                    width={43}
                    height={70}
                    currentPage={currentPage}
                  >
                    <DeleteModal />
                  </Modal>
                )}
              </div>
            );
          }
        })}
      </div>
    </aside>
  );
}

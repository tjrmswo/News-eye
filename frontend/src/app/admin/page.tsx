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
import Dashboard from '@/components/admin/dashboard';
import Analyst from '@/components/admin/analyst';

// types
import { ComponentsType, IconMapType } from '@/types/admin';
// constants
import { AdminTabs } from '@/constants/admin';
import Modal from '@/components/modal';

export default function Admin() {
  // 컴포넌트 상태
  const [page, setPage] = useState<string>('Dashboard');
  // 모달
  const [modal, setModal] = useState<boolean>(false);

  const handleModal = () => {
    setModal(!modal);
  };

  function getPageModal(page: string) {
    if (page === 'Dashboard' || page === 'Analyst') {
      setPage(page);
    } else {
      setModal(!modal);
    }
  }

  const IconMap: IconMapType = {
    Dashboard: ChartBarDecreasing,
    Analyst: ChartNoAxesCombined,
    LogOut: LogOut,
    DeleteID: UserRoundX,
  };

  const ShowCom: ComponentsType = {
    Dashboard: <Dashboard />,
    Analyst: <Analyst />,
  };

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  return (
    <div className="flex min-h-screen w-full flex-row bg-[#F4F4F4]">
      {modal && <div id="modal-container"></div>}
      {modal && (
        <div
          className="bg-[rgba(0, 0, 0.15)] fixed z-[4] size-full"
          onClick={handleModal}
        ></div>
      )}
      <main className="flex w-full flex-row items-center justify-around">
        <div className="m-5 flex size-[250px] flex-col items-center gap-3 rounded-[0.3rem] bg-white">
          <div className="relative right-3 mt-4 flex flex-row items-center">
            <Image
              src={'/images/news-eye.png'}
              alt="로고"
              width={50}
              height={50}
            />
            <span className="text-[1.2rem]">News-eye</span>
          </div>
          <div className="flex h-[120px] w-[150px] cursor-pointer flex-col items-center justify-between">
            {AdminTabs.map((tab) => {
              const IconComponent = IconMap[tab.name];
              return (
                <div
                  key={tab.name}
                  className="flex h-[25px] w-full flex-row items-center rounded-[0.2rem] px-3 hover:bg-[#F3F3F3]"
                  onClick={() => {
                    getPageModal(tab.name);
                  }}
                >
                  {IconComponent ? (
                    <IconComponent className="ml-2 size-[18px]" />
                  ) : null}
                  <span className="ml-2 text-center text-[0.9rem]">
                    {tab.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <div className="h-[90%] w-[89%] rounded-lg bg-white p-4">
            {ShowCom[page]}
          </div>
        </div>
        {modal && (
          <Modal handleModal={handleModal} width={26} height={30}>
            <div className="flex h-full flex-col items-center justify-evenly">
              <span>로그아웃 하시겠습니까?</span>

              <div className="flex w-[70%] flex-row justify-between">
                <button className="w-[100px] rounded-[0.3rem] border-2 border-[black] hover:bg-[black] hover:text-[white]">
                  확인
                </button>
                <button className="w-[100px] rounded-[0.3rem] border-2 border-[black] bg-[black] text-[white] hover:border-2 hover:border-[black] hover:bg-[white] hover:text-[black]">
                  취소
                </button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

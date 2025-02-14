'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// components
import Dashboard from '@/components/admin/dashboard';
import Analyst from '@/components/admin/analyst';
// icons
import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';
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
    <div className="flex flex-row w-full min-h-screen bg-[#F4F4F4]">
      {modal && <div id="modal-container"></div>}
      {modal && (
        <div
          className="fixed size-full z-[4] bg-[rgba(0, 0, 0, 0.15)]"
          onClick={handleModal}
        ></div>
      )}
      <main className="flex flex-row w-full justify-around items-center">
        <div className="flex flex-col w-[250px] h-[250px] bg-white m-5 rounded-[0.3rem] items-center gap-3">
          <div className="relative right-3 flex flex-row items-center mt-4">
            <Image
              src={'/images/news-eye.png'}
              alt="로고"
              width={50}
              height={50}
            />
            <span className="text-[1.2rem]">News-eye</span>
          </div>
          <div className="flex flex-col w-[150px] h-[120px] justify-between cursor-pointer items-center">
            {AdminTabs.map((tab) => {
              const IconComponent = IconMap[tab.name];
              return (
                <div
                  key={tab.name}
                  className="w-[100%] h-[25px] flex flex-row items-center hover:bg-[#F3F3F3] rounded-[0.2rem] px-3"
                  onClick={() => {
                    getPageModal(tab.name);
                  }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-[18px] h-[18px] ml-2" />
                  ) : null}
                  <span className="ml-2 text-[0.9rem] text-center">
                    {tab.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center h-screen">
          <div className="w-[89%] h-[90%] bg-white rounded-[0.5rem] p-4">
            {ShowCom[page]}
          </div>
        </div>
        {modal && (
          <Modal handleModal={handleModal} width={26} height={30}>
            <div className="h-full flex flex-col items-center justify-evenly">
              <span>로그아웃 하시겠습니까?</span>

              <div className="w-[70%] flex flex-row justify-between">
                <button className="w-[100px] border-2 border-[black] rounded-[0.3rem] hover:bg-[black] hover:text-[white]">
                  확인
                </button>
                <button className="w-[100px] border-2 border-[black] rounded-[0.3rem] bg-[black] text-[white] hover:border-2 hover:border-[black] hover:text-[black] hover:bg-[white]">
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

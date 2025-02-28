'use client';
import Image from 'next/image';
import Link from 'next/link';

// constants
import { AdminTabs } from '@/constants/admin';
import { Reasons } from '@/constants/reason';

// types
import { IconMapType } from '@/types/admin';

// icons
import {
  ChartBarDecreasing,
  ChartNoAxesCombined,
  LogOut,
  UserRoundX,
} from 'lucide-react';

// libraries
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';

export default function SideTab() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const IconMap: IconMapType = {
    dashboard: ChartBarDecreasing,
    analysis: ChartNoAxesCombined,
    logout: LogOut,
    deleteID: UserRoundX,
  };

  return (
    <aside className="m-5 flex size-3xs flex-col items-center gap-3 rounded-md bg-white">
      <div className="relative right-3 mt-4 flex flex-row items-center">
        <Image src={'/images/news-eye.png'} alt="로고" width={50} height={50} />
        <span className="text-lg">News-eye</span>
      </div>
      <div className="flex h-[8rem] cursor-pointer flex-col items-center justify-between">
        {AdminTabs.map((tab, i) => {
          const IconComponent = IconMap[tab.name];
          if (tab.name === 'dashboard' || tab.name === 'analysis') {
            return (
              <Link className="w-[10rem]" key={i} href={`/admin/${tab.name}`}>
                <div className="flex w-[7.8rem] h-[1.5rem] w-full flex-row items-center rounded-sm hover:bg-[#F3F3F3] px-2 justify-center">
                  {IconComponent ? (
                    <IconComponent className="size-[1rem]" />
                  ) : null}
                  <span className="ml-3 text-md">{tab.name}</span>
                </div>
              </Link>
            );
          } else if (tab.name === 'logout') {
            return (
              <div key={i} className="flex flex-col w-[10rem]">
                <div
                  className="flex w-full h-[1.5rem] flex-row items-center justify-center rounded-sm hover:bg-[#F3F3F3]"
                  onClick={onOpen}
                >
                  {IconComponent ? <IconComponent className="w-4 h-4" /> : null}
                  <span className="ml-3 text-md">{tab.name}</span>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent className="fixed w-full max-w-md min-h-[14rem] p-6 bg-white rounded-lg shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3">
                    {(onClose) => (
                      <div className="flex flex-col items-center h-full">
                        <ModalBody className="flex flex-col justify-between bg-yellow h-full text-center">
                          <div className="text-lg font-semibold pt-5">
                            로그아웃 하시겠습니까?
                          </div>
                          <div className="flex flex-row justify-between w-[14rem] mt-8">
                            <Button
                              className="px-7 border-2 border-black rounded-md"
                              variant="solid"
                            >
                              확인
                            </Button>
                            <Button
                              className="px-7 border-2 border-black rounded-md text-white bg-black "
                              variant="bordered"
                            >
                              취소
                            </Button>
                          </div>
                        </ModalBody>
                      </div>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            );
          } else if (tab.name === 'deleteID') {
            return (
              <div key={i} className="flex flex-col w-[10rem]">
                <div
                  className="flex w-full h-[1.5rem] flex-row items-center justify-center rounded-sm hover:bg-[#F3F3F3]"
                  onClick={onOpen}
                >
                  {IconComponent ? <IconComponent className="w-4 h-4" /> : null}
                  <span className="ml-3 text-md">{tab.name}</span>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent className="fixed w-full max-w-md min-h-[14rem] p-6 bg-white rounded-lg shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3">
                    {(onClose) => (
                      <div className="flex flex-col items-center h-full">
                        <ModalBody className="flex flex-col justify-between bg-yellow h-full text-center">
                          <span className="w-[6rem] text-lg font-semibold pt-5 border-b-2 border-black">
                            회원탈퇴
                          </span>
                        </ModalBody>
                      </div>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            );
          }
        })}
      </div>
    </aside>
  );
}

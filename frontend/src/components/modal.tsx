import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalType {
  children: React.ReactNode;
  handleModal: () => void;
  width: number;
  height: number;
}

export default function Modal({
  children,
  handleModal,
  width,
  height,
}: ModalType) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modal = document.getElementById('modal-container'); // ID로 접근
    setModalRoot(modal);
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleModal}
    >
      <div
        style={{ width: `${width}vw`, height: `${height}vh` }}
        className="rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex flex-row justify-end p-2">
          <X className="cursor-pointer" size={15} onClick={handleModal} />{' '}
          {/* 모달 닫기 버튼 */}
        </header>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

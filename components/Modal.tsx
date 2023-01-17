import { useEffect } from 'react';
import ReactPortal from './ReactPortal';

interface ModalProps {
  children: any;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  // close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  // disable scroll on modal load
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  });

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div>
        <div className="fixed bottom-0 left-0 w-screen h-full z-40 bg-secondary opacity-20" />
        <div
          className="fixed m-auto left-0 right-0 top-0 bottom-80 flex flex-col 
        z-50 dark:bg-nav-dark bg-nav-light shadow-2xl border-primary border-2
        rounded-lg min-h-[100px] max-h-fit w-[90%] max-w-xl"
        >
          <div
            className="bg-primary rounded-t-sm h-[5px] w-full
        flex flex-col"
          ></div>
          <div
            className="h-full flex-grow p-5 px-10 text-center
        flex flex-col gap-5 justify-between items-center"
          >
            {children}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;

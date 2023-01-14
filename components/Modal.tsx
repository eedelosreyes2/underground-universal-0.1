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
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-secondary opacity-20" />
        <div
          className="absolute m-auto left-0 right-0 top-[80px] flex flex-col 
        z-50 dark:bg-nav-dark bg-nav-light shadow-2xl border-primary border-2
        rounded-lg min-h-[100px] w-[80%] max-w-xl"
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
            {/* <div>
          hey this is contenthey this is contenthey this is contenthey this is
          contenthey this is contenthey this is contenthey this is contenthey
          this is contenthey this is contenthey this is content
        </div>
        <div>This is the button container</div> */}
          </div>
        </div>
      </>
    </ReactPortal>
  );
};

export default Modal;

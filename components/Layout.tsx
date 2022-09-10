import { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './navigation/BottomNav';
import LeftNav from './navigation/LeftNav';
import TopNav from './navigation/TopNav';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <Header />
      <div
        className="z-50 flex flex-col min-h-screen mx-auto max-w-[2200px]  
        bg-fill-light dark:bg-fill-dark sm:flex-row"
        {...props}
      >
        <LeftNav />
        <div className="relative w-full">
          <TopNav />
          <div className="px-5 sm:px-0 w-full">{children}</div>
          <BottomNav />
        </div>
      </div>
      <div
        className="z-[-1] w-6/12 h-screen absolute top-0 left-0 
        bg-nav-light dark:bg-nav-dark"
      ></div>
      <div
        className="z-[-1] w-6/12 h-screen absolute top-0 right-0 
        bg-fill-light dark:bg-fill-dark"
      ></div>
    </>
  );
}

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
        bg-fill-light dark:bg-fill-dark md:flex-row"
        {...props}
      >
        <LeftNav />
        <div className="relative w-full">
          <TopNav />
          <div className="w-full">{children}</div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}

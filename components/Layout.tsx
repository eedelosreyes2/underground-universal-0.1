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
      {/* Window container */}
      <div
        className="z-50 flex flex-col mx-auto max-w-[2200px]  
         md:flex-row"
        {...props}
      >
        <LeftNav />
        <div className="relative w-full z-10">
          <TopNav />
          {children}
          <BottomNav />
        </div>
      </div>
    </>
  );
}

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
      <main
        className="flex flex-col min-h-screen bg-fill-light dark:bg-fill-dark sm:flex-row"
        {...props}
      >
        <LeftNav />
        <div className="w-full">
          <TopNav />
          <div className="px-5 sm:px-0 w-full">{children}</div>
          <BottomNav />
        </div>
      </main>
    </>
  );
}

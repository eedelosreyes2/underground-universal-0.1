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
      <main className="main" {...props}>
        <LeftNav />
        <div className="w-full">
          <TopNav />
          {children}
          <BottomNav />
        </div>
      </main>
    </>
  );
}

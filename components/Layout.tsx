import { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './navigation/BottomNav';
import LeftNav from './navigation/LeftNav';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <Header />
      <main className="main" {...props}>
        <LeftNav />
        {children}
        <BottomNav />
      </main>
    </>
  );
}

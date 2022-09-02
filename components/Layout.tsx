import { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './navigation/BottomNav';
import Nav from './navigation/Nav';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <main className="main" {...props}>
        <Header />
        <Nav />
        {children}
        <BottomNav />
      </main>
    </>
  );
}

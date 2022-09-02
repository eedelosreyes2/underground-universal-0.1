import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const Nav = dynamic(() => import('../components/Nav'), { ssr: false });

interface Props {
  children?: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <main className="main" {...props}>
        <Nav />
        {children}
      </main>
    </>
  );
}

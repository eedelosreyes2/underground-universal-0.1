import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
  href: string;
}

const ActiveLink = ({ children, href }: Props) => {
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.pathname === href ? 'text-primary font-bold' : ''}
    >
      {children}
    </a>
  );
};

export default ActiveLink;

import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  href: string;
}

const ActiveLink = ({ children, href }: Props) => {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (href === "/discover" || href === "/settings" || user) {
      router.push(href);
    } else {
      alert("This page is for members only, JOIN to have access.");
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.pathname === href ? "text-primary font-bold" : ""}
    >
      {children}
    </a>
  );
};

export default ActiveLink;
